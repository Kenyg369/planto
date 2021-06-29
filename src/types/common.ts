import { QVirtualScroll } from "quasar";
import { Ref } from "vue";

export enum SortDirection {
  Desc = -1,
  Asc = 1
}

export interface SortBy {
  name: string;
  type: SortDirection;
}

export type PaginationTotalKey = "totalRecordCount" | "totalCount";

export interface PaginatedResponse<T> {
  totalRecordCount?: number;
  totalCount?: number;
  pageNumber: number;
  pageSize: number;
  results: T[];
}

export interface VirtualScrollPayload {
  index: number;
  from: number;
  to: number;
  ref: QVirtualScroll;
}

export type InfiniteScrollHandler = (
  index: number,
  done: () => void,
) => void | Promise<void>;

export interface SearchDropdownComposable<T> {
  searchDropdownOptions: Ref<T[]>;
  searchDropdownHandler: (query: string) => Promise<void>;
}

export type SearchDropdownHandler = (
  query: string,
  done: () => void,
  abort?: () => void
) => void | Promise<void>;

export interface SearchOptions {
  pageSize: number;
  pageNumber: number;
  includeSearchResult: boolean;
  includeTotalRecordCount?: boolean;
  sort: SortBy[];
}

export interface BaseSearchRequest {
  options?: SearchOptions;
}

export interface OperatorModel<T> {
  operator: SupportedOperator;
  value: T;
}

// Leaving in as reference
export enum SupportedOperator {
  equals = "=",
  notEqual = "<>",
  lessThan = "<",
  greaterThan = ">",
  in = "in",
  exists = "exists"
}

export interface LockResponse {
  eTag: string;
  lockToken: string;
}

export default interface ErrorModel {
  name: string;
  reason: string;
  details: ErrorDetail[];
}

interface ErrorDetail {
  entityType: string;
  entityName: string;
  value: string;
  issue: string;
  location: string;
}

export interface UpdatePayload<T> {
  [key: string]: Partial<T>;
}
