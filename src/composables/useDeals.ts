import { Notify, QTable } from "quasar";
import { Ref, ref, watch } from "vue";

import { search as dealsSearch, getByLoanNumber, update as dealUpdate } from "@/api/dealsApi";
import { Deal, DealSearchRequest, DealSearchCriteria, CurrentLoanStatusCode } from "@/types/deals";

import { useUnderwritersFilter } from "./useUnderwritersFilter";
import { tablePaginationToSearchOptions, responseToPagination, updateArray, cleanUpdates } from "./useUtils";
import { Config } from "@/config";
import { Underwriter } from "@/types/underwriter";
import { i18n } from "@/plugins/i18n";
import { UpdatePayload } from "@/types/common";

interface DealsComposable {
  loading: Ref<boolean>;
  pagination: Ref<Required<QTable>["pagination"]>;
  deals: Ref<Deal[]>;
  toBeUpdated: Ref<UpdatePayload<Deal>>;
  search: () => Promise<void>;
  update: (key: Deal["mortgageNumber"], payload: Partial<Deal>) => void;
  applyUpdates: () => Promise<void>;
  setDeals: (rawDeals: Deal[]) => void;
}

/**
 * Todo: These data loading composable are really similar,
 * we should refactor this to have a parent composable that contains the common code.
 */
export const useDeals = (): DealsComposable => {
  const { underwritersFilter, currentFilters } = useUnderwritersFilter();

  const loading = ref(false);
  const pagination = ref<Required<QTable>["pagination"]>({
    page: 1,
    rowsPerPage: Config.pagination.perPage,
    rowsNumber: Config.pagination.perPage
  });

  const deals = ref<Deal[]>([]);
  const _deals = ref<Deal[]>([]); // keep a copy of original raw data to check dirty
  const toBeUpdated = ref<UpdatePayload<Deal>>({});

  const setDeals = (rawDeals: Deal[]): void => {
    deals.value = [...rawDeals];
    _deals.value = [...rawDeals];
  };

  const search = async (): Promise<void> => {
    if (currentFilters.lenders.length === 0) {
      setDeals([]);

      return;
    }

    loading.value = true;

    const searchCriteria: DealSearchCriteria = {
      statuses: [CurrentLoanStatusCode.Ingested, CurrentLoanStatusCode.IngestedResubmission]
    };

    if (currentFilters.broker) {
      searchCriteria.brokerName = currentFilters.broker.name;
    }
    else {
      searchCriteria.underwriterIds = underwritersFilter.value.map(uw => uw.id);
    }

    const request: DealSearchRequest = {
      searchCriteria,
      options: tablePaginationToSearchOptions(pagination.value)
    };

    const response = await dealsSearch(request);

    loading.value = false;

    pagination.value = {
      ...pagination.value,
      ...responseToPagination(response)
    };

    setDeals(response.results);
  };

  const update = (key: Deal["loanNumber"], payload: Partial<Deal>): void => {
    const updatePayload = { ...payload };
    if ("underwriter" in payload) {
      if (payload.underwriter) {
        updatePayload.underwriterId = payload.underwriter.id;
        updatePayload.appOwner = payload.underwriter.name;
        updatePayload.underwriterName = payload.underwriter.name;
      }
      else { // null or undefined, unset the underwriter
        updatePayload.underwriterId = null;
        updatePayload.appOwner = null;
        updatePayload.underwriterName = null;
      }

      delete updatePayload.underwriter;
    }

    if ("assignedTo" in payload) {
      if (payload.assignedTo) {
        updatePayload.assignedToUserId = (payload.assignedTo as Underwriter).id;
        updatePayload.assignedToUserName = (payload.assignedTo as Underwriter).name;
        updatePayload.assignedTo = (payload.assignedTo as Underwriter).name;
      }
      else { // null or undefined, unset the assignedTo
        updatePayload.assignedToUserId = null;
        updatePayload.assignedToUserName = null;
        updatePayload.assignedTo = null;
        updatePayload.assignmentStartAt = null;
        updatePayload.assignmentEndAt = null;
      }
    }

    updateArray<Deal>(deals.value, deal => deal.loanNumber === key, updatePayload);
    toBeUpdated.value[key] = {
      ...toBeUpdated.value[key],
      ...updatePayload
    };
    toBeUpdated.value = cleanUpdates<Deal>({
      originalArray: _deals.value,
      where: (deal, key) => deal.loanNumber === key,
      updates: toBeUpdated.value
    });
  };

  const applyUpdates = async (): Promise<void> => {
    const { t } = i18n.global; // eslint-disable-line @typescript-eslint/unbound-method
    loading.value = true;

    try {
      for (const [loanNumber, deal] of Object.entries(toBeUpdated.value)) {
        const fullDeal = await getByLoanNumber(loanNumber as string);
        const dealUpdatePayload = { ...fullDeal, ...deal };
        const updatedDeal = await dealUpdate(dealUpdatePayload);
        updateArray<Deal>(deals.value, deal => deal.loanNumber === updatedDeal.loanNumber, updatedDeal);
      }

      Notify.create({
        type: "positive",
        message: t("notifications.updateSucceed")
      });
    }
    finally {
      toBeUpdated.value = {};
      loading.value = false;
    }
  };

  watch(() => [currentFilters.lenders, underwritersFilter.value, currentFilters.broker], () => {
    pagination.value.page = 1;
    search();
    toBeUpdated.value = {};
  });

  return {
    loading,
    pagination,
    deals,
    search,
    update,
    toBeUpdated,
    applyUpdates,
    setDeals
  };
};
