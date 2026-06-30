import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {

 return (

<div className="flex h-screen">

<Sidebar />

<div className="ml-72 flex-1 flex flex-col overflow-hidden">

<Header />

<div className="flex-1 overflow-y-auto bg-linear-to-br from-slate-950 via-slate-900 to-black p-8">

{children}

</div>

</div>

</div>

 );
}