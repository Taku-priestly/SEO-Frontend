interface Props {
 title: string;
 value: string;
}

export default function MetricCard({
 title,
 value,
}: Props) {

 return (

<div
className="
bg-slate-900
border
border-slate-800
rounded-xl
p-6">

<h3
className="
text-slate-400
mb-3">

{title}

</h3>

<div
className="
text-white
text-4xl
font-bold">

{value}

</div>

</div>

 );
}