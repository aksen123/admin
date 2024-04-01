import api from "./axios";

export const storeApi = {
  list(): Promise<string[]> {
    return api.get("/api/store");
  },
};
