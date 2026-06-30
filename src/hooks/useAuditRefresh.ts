import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshAudit } from "../api/auditApi";

export const useAuditRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshAudit,
    onSuccess: (_data, auditId) => {
      queryClient.invalidateQueries({ queryKey: ["audit-status", auditId] });
      queryClient.invalidateQueries({ queryKey: ["analysis", auditId] });
      queryClient.invalidateQueries({ queryKey: ["ml-results", auditId] });
      queryClient.invalidateQueries({ queryKey: ["roadmap", auditId] });
      queryClient.invalidateQueries({ queryKey: ["report", auditId] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
