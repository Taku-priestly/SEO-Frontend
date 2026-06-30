interface Props {
 progress: number;
}

export default function AuditProgressBar({
 progress,
}: Props) {

 return (

<div>

<div
className="
w-full
bg-slate-700
rounded-full
h-4">

<div
style={{
 width: `${progress}%`,
}}

className="
bg-blue-500
h-4
rounded-full"
/>

</div>

<p
className="
text-slate-300
mt-2">

{progress}%

</p>

</div>

 );

}