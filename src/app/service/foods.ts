import api from "./axios";

export const foodsService = {
  get() {
    return api.get("/api/menu");
  },
};
