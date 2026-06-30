interface Props{
 priority:string;
}

export default function PriorityBadge({
 priority
}:Props){

 const color=

 priority==="HIGH"
 ? "bg-red-500"

 : priority==="MEDIUM"
 ? "bg-yellow-500"

 : "bg-green-500";

 return(

<span
className={`
${color}
px-3
py-1
rounded-full
text-white
text-xs
`}>

{priority}

</span>

 );

}