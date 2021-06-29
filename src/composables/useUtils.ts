import { QTable } from "quasar";

import { PaginatedResponse, PaginationTotalKey, SortDirection, UpdatePayload } from "@/types/common";
import { SearchOptions } from "@/types/common";
import { Config } from "@/config";
import { parseISO, format, isValid } from "date-fns";

export const tablePaginationToSearchOptions = (pagination: QTable["pagination"]): SearchOptions => {
  const options: SearchOptions = {
    pageSize: pagination?.rowsPerPage ?? Config.pagination.perPage,
    pageNumber: pagination?.page ?? 1,
    includeTotalRecordCount: true,
    includeSearchResult: true,
    sort: [],
  };

  if (pagination?.sortBy) {
    options.sort.push({
      name: pagination?.sortBy,
      type: pagination?.descending as boolean ? SortDirection.Desc : SortDirection.Asc,
    });
  }

  return options;
};

export const responseToPagination = <T>(res: PaginatedResponse<T>, totalKey: PaginationTotalKey = "totalRecordCount"): QTable["pagination"] => ({
  page: res.pageNumber,
  rowsPerPage: res.pageSize,
  rowsNumber: res[totalKey]
});

/**
 * Function to update arrary of object
 */
export const updateArray = <T>(arr: T[], where: (obj: T) => boolean, payload: Partial<T>): void => {
  const idx = arr.findIndex(where);

  if (idx === -1) {
    return;
  }

  const newObj = {
    ...arr[idx],
    ...payload
  };

  arr[idx] = newObj;
};

export const isEmpty = (obj: Record<string, unknown> | unknown[]): boolean => {
  return Object.keys(obj).length === 0;
};

export interface CleanUpdatesPayload<T> {
  originalArray: T[];
  where: (obj: T, key: string) => boolean;
  updates: UpdatePayload<T>;
  ignores?: string[];
}
export const cleanUpdates = <T>(payload: CleanUpdatesPayload<T>): UpdatePayload<T> => {
  const cleanedUpdates: UpdatePayload<T> = {};
  for (const [key, updateItem] of Object.entries(payload.updates)) {
    const raw = payload.originalArray.find(i => payload.where(i, key)) as T;

    if (!raw) {
      throw new Error("Item to update not found");
    }

    const keyedUpdates: Record<string, unknown> = {};

    for (const [updateKey, update] of Object.entries(updateItem)) {
      if (JSON.stringify(raw[updateKey as keyof T]) !== JSON.stringify(update)) {
        keyedUpdates[updateKey] = update;
      }
    }

    if (
      !isEmpty(keyedUpdates) &&
      Object.keys(keyedUpdates).filter(key => !payload.ignores?.includes(key)).length > 0
    ) {
      cleanedUpdates[key] = keyedUpdates as Partial<T>;
    }
  }

  return cleanedUpdates;
};

export const enumToOptions = (
    enumObject: Record<string, string>,
    excludedKeys: string[] = [],
    labelKey = "label",
    valueKey = "value"
): Array<Record<string, string>> =>
  Object.entries(enumObject)
    .map(kv => ({
      [labelKey]: kv[1],
      [valueKey]: kv[1]
    }))
    .filter(option => !excludedKeys.includes(option[labelKey]));

export const currentDate = (isGettingString = true): Date | string => isGettingString ? new Date().toISOString() : new Date();

export const formatDate = (date: string): string => date ? format(parseISO(date), "yyyy-MM-dd") : "";

export const isDate = (date: string): boolean => isValid(new Date(date));
