import { useQuery }
from "@tanstack/react-query";

import {
 getAuditHistory
}
from "../api/historyApi";

export const useAuditHistory =
() => {

 return useQuery({

  queryKey:["history"],

  queryFn:getAuditHistory,

 });

};