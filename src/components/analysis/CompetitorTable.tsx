interface Competitor {
 rank: number;
 domain: string;
 wordCount: number;
 h1Count: number;
}

export default function CompetitorTable({
 competitors,
}: {
 competitors: Competitor[];
}) {

 return (

<div
className="
bg-slate-900
border
border-slate-800
rounded-xl
overflow-hidden">

<table className="w-full">

<thead
className="
bg-slate-800">

<tr>

<th className="p-4 text-slate-400 text-xs uppercase tracking-[0.3em]">
Rank
</th>

<th className="text-slate-400 text-xs uppercase tracking-[0.3em]">
Domain
</th>

<th className="text-slate-400 text-xs uppercase tracking-[0.3em]">
Words
</th>

<th className="text-slate-400 text-xs uppercase tracking-[0.3em]">
H1
</th>

</tr>

</thead>

<tbody>

{
 competitors.map((c) => (

<tr
key={c.rank}
className="
border-t
border-slate-800">

<td className="p-4 text-white">
{c.rank}
</td>

<td className="text-white">
{c.domain}
</td>

<td className="text-white">
{c.wordCount}
</td>

<td className="text-white">
{c.h1Count}
</td>

</tr>

 ))
}

</tbody>

</table>

</div>

 );

}