interface Props {
 confidence:number;
}

export default function ConfidenceCard({
 confidence
}:Props){

 return(

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
mb-4">

Model Confidence

</h3>

<div
className="
text-white
text-5xl
font-bold">

{confidence}%

</div>

</div>

 );

}