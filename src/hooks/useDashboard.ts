import { useQuery } from "@tanstack/react-query";

import { getDashboardOverview } from "../api/dashboardApi";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardOverview,
  });
};
