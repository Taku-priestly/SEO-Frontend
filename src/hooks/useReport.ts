import { useQuery } from "@tanstack/react-query";

import { getReport } from "../api/reportApi";

export const useReport = (auditId: string) => {
  return useQuery({
    queryKey: ["report", auditId],
    queryFn: () => getReport(auditId),
  });
};
