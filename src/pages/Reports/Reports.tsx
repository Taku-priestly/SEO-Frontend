import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout
from "../../layouts/DashboardLayout";

import ExportButtons
from "../../components/reports/ExportButtons";

import ReportPreview
from "../../components/reports/ReportPreview";

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
        <div className="text-slate-300 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Select an Audit</h2>
          <p>Go to your audit history and pick an audit to view its report.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading report...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Report not found.</div>
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
            className="rounded-2xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 transition disabled:opacity-50"
          >
            {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
        <ReportPreview report={data} />
      </div>
    </DashboardLayout>
  );
}
