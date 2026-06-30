import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import ExportButtons from "../../components/reports/ExportButtons";
import ReportPreview from "../../components/reports/ReportPreview";

import { useReport } from "../../hooks/useReport";
import { useAuditRefresh } from "../../hooks/useAuditRefresh";

export default function Reports() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useReport(id ?? "");
  const refreshMutation = useAuditRefresh();

  const handleRefresh = async () => {
    if (!id) return;
    const result = await refreshMutation.mutateAsync(id);
    navigate(`/audit-progress/${result.audit_id}`);
  };

  if (!id) {
    return (
      <DashboardLayout>
        <div className="text-center py-24">
          <h1 className="text-white text-4xl font-bold tracking-tight mb-4">Reports</h1>
          <p className="text-slate-400 text-lg">Select an audit from your history to view its report.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-24">
          <h1 className="text-white text-4xl font-bold tracking-tight mb-4">Reports</h1>
          <p className="text-slate-400 text-lg animate-pulse">Loading report...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center py-24">
          <h1 className="text-white text-4xl font-bold tracking-tight mb-4">Reports</h1>
          <p className="text-slate-400 text-lg">Report not found.</p>
          <button
            onClick={() => navigate("/history")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to History
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <ExportButtons auditId={id ?? ""} />
          <button
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition disabled:opacity-50"
          >
            {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
        <ReportPreview report={data} />
      </div>
    </DashboardLayout>
  );
}
