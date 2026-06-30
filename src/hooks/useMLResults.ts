import { useQuery } from "@tanstack/react-query";

import { getMLResults }
from "../api/mlApi";

export const useMLResults = (
 auditId:string
) => {

 return useQuery({
  queryKey:[
   "ml-results",
   auditId
  ],

  queryFn:()=>
   getMLResults(auditId)
 });

};