import api from "./axios";

export const chartService = {
  getYear() {
    return api.get("/api/chart");
  },
};
