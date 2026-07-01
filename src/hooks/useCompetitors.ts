import { useQuery } from "@tanstack/react-query";

import { getCompetitors }
from "../api/competitorsApi";

export const useCompetitors = (
 auditId: string
) => {

 return useQuery({
  queryKey: [
   "competitors",
   auditId,
  ],

  queryFn: () =>
   getCompetitors(auditId),
 });

};
