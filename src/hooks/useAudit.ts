import { useMutation } from "@tanstack/react-query";
import { startAudit } from "../api/auditApi";

export const useAudit = () => {

  return useMutation({
    mutationFn: startAudit,
  });

};