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
    <div className="flex gap-4">
      <button onClick={() => handleExport("pdf")} className="bg-red-600 text-white px-6 py-3 rounded-lg">
        Export PDF
      </button>
      <button onClick={() => handleExport("csv")} className="bg-green-600 text-white px-6 py-3 rounded-lg">
        Export CSV
      </button>
    </div>
  );
}
