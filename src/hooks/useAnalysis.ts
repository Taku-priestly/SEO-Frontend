import { useQuery } from "@tanstack/react-query";

import { getAnalysis }
from "../api/analysisApi";

export const useAnalysis = (
 auditId: string
) => {

 return useQuery({
  queryKey: [
   "analysis",
   auditId,
  ],

  queryFn: () =>
   getAnalysis(auditId),
 });

};