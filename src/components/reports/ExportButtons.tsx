import { Printer } from "lucide-react";
import { exportReport } from "../../api/reportApi";

interface Props {
  auditId: string;
}

export default function ExportButtons({ auditId }: Props) {
  const handleExport = async (format: string) => {
    try {
      const result = await exportReport(auditId);
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `seo-report-${auditId}.${format === "pdf" ? "pdf" : "csv"}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition"
      >
        <Printer size={16} />
        Print Report
      </button>
      <button onClick={() => handleExport("pdf")} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition">
        Export PDF
      </button>
      <button onClick={() => handleExport("csv")} className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition">
        Export CSV
      </button>
    </div>
  );
}
