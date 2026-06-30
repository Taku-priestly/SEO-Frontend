interface Props {
 grade: string;
}

export default function SeoGradeCard({
 grade,
}: Props) {

 const color =
 grade === "High"
 ? "bg-green-500"
 : grade === "Medium"
 ? "bg-yellow-500"
 : "bg-red-500";

 return (

<div
className={`
${color}
rounded-xl
p-8
text-white
`}>

<h2
className="
text-lg
mb-4">

SEO Quality Score

</h2>

<div
className="
text-6xl
font-bold">

{grade}

</div>

</div>

 );

}