import PriorityBadge
from "./PriorityBadge";

interface Task{

 title:string;

 priority:string;

 seoGain:number;

 duration:string;
}

export default function RoadmapTaskCard({
 task
}:{
 task:Task
}){

 return(

<div
className="
bg-slate-900
border
border-slate-800
rounded-xl
p-6">

<div
className="
flex
justify-between
mb-4">

<h3
className="
text-white
font-semibold">

{task.title}

</h3>

<PriorityBadge
priority={task.priority}
/>

</div>

<p
className="
text-slate-400
mb-2">

Expected SEO Gain

</p>

<p
className="
text-green-400
text-xl">

+{task.seoGain}%

</p>

<p
className="
text-slate-500
mt-4">

Duration:
{task.duration}

</p>

</div>

 );

}