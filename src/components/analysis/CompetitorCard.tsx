interface Props {
 title: string;
 value: string | number;
 subtitle?: string;
}

export default function CompetitorCard({
 title,
 value,
 subtitle,
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
mb-2">

{title}

</h3>

<div
className="
text-white
text-3xl
font-bold">

{value}

</div>

{subtitle ? (
 <p className="text-slate-400 mt-3 text-sm">{subtitle}</p>
) : null}

</div>

 );

}