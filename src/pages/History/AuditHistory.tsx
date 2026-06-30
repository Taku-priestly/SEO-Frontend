import DashboardLayout
from "../../layouts/DashboardLayout";

import HistoryFilters
from "../../components/history/HistoryFilters";

import HistoryTable
from "../../components/history/HistoryTable";

import { useAuditHistory } from "../../hooks/useAuditHistory";

export default function AuditHistory() {
  const { data, isLoading } = useAuditHistory();

  const audits = (data?.audits ?? []).map((a: any) => ({
    id: a.id,
    domain: a.domain,
    keyword: a.keyword,
    score: typeof a.score === "string" ? a.score : "Pending",
    createdAt: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
  }));

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading history...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <HistoryFilters />
      <HistoryTable audits={audits} />
    </DashboardLayout>
  );
}
