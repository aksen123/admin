import api from "./axios";

export const defaultApi = {
  list() {
    return api.get("/api/default-menu");
  },
};
