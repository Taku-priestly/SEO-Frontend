import { useQuery } from "@tanstack/react-query";

import { getAuditStatus } from "../api/auditApi";

export const useAuditStatus = (auditId: string) => {
  return useQuery({
    queryKey: ["audit-status", auditId],
    queryFn: () => getAuditStatus(auditId),
    refetchInterval: 5000,
  });
};
