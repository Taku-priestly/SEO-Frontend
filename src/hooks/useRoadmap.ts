import { useQuery }
from "@tanstack/react-query";

import { getRoadmap }
from "../api/roadmapApi";

export const useRoadmap = (
 auditId:string
) => {

 return useQuery({

  queryKey:[
   "roadmap",
   auditId
  ],

  queryFn:()=>
   getRoadmap(auditId)

 });

};