import { apiClient } from "@/api/ApiClient";

export const postSpy = jest.spyOn(apiClient, "post");
export const getSpy = jest.spyOn(apiClient, "get");
export const putSpy = jest.spyOn(apiClient, "put");
