import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout
from "../../layouts/DashboardLayout";

import { useAnalysis } from "../../hooks/useAnalysis";
import { useAuditRefresh } from "../../hooks/useAuditRefresh";

export default function Analysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useAnalysis(id ?? "");
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
          <p>Go to your audit history and pick an audit to view its analysis.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading analysis...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Analysis not found.</div>
      </DashboardLayout>
    );
  }

  const criticalIssues = data.metadataIssues?.filter((m: any) => m.status === "critical" || m.status === "error") ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-slate-400 uppercase tracking-[0.3em] text-xs mb-2">Page Analysis</p>
              <h1 className="text-white text-4xl font-bold break-all">{data.targetUrl}</h1>
              <p className="text-slate-400 mt-4 max-w-2xl">
                SEO audit for keyword "<span className="text-sky-300">{data.keyword}</span>".
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshMutation.isPending}
                className="rounded-2xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 transition disabled:opacity-50"
              >
                {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">Metadata Inspector</p>
                  <h2 className="text-white text-xl font-semibold mt-2">
                    {criticalIssues.length > 0 ? "Critical Errors" : "Metadata"}
                  </h2>
                </div>
                {criticalIssues.length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                    {criticalIssues.length} Critical
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {data.metadataIssues?.length === 0 && (
                  <p className="text-slate-400 text-sm">No metadata issues found.</p>
                )}
                {data.metadataIssues?.map((issue: any, i: number) => (
                  <div key={i} className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">{issue.field}</p>
                    <p className="text-white">{issue.value ?? "N/A"}</p>
                    <p className="text-slate-500 text-[11px] mt-2">{issue.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">DOM Hierarchy Inspector</p>
                  <h2 className="text-white text-xl font-semibold mt-2">H1 → Content Structure</h2>
                </div>
                <span className={`text-xs uppercase tracking-[0.2em] ${data.headings.h1HasKeyword ? "text-green-400" : "text-sky-300"}`}>
                  {data.headings.h1HasKeyword ? "Keyword Found" : "Missing Keyword"}
                </span>
              </div>
              <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 mb-4">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">H1 Tag Found</p>
                <p className="text-white">"{data.headings.h1 ?? "N/A"}"</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Total H2s</p>
                  <p className="text-white font-semibold">{data.headings.h2Count}</p>
                </div>
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">H2 Matches</p>
                  <p className="text-white font-semibold">{data.headings.h2KeywordMatches}</p>
                </div>
              </div>
              <div className="space-y-2 text-slate-400 text-sm">
                {data.headings.sampleH2?.map((h2: string, i: number) => (
                  <div key={i}>{h2}</div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">Technical Architecture</p>
                  <h2 className="text-white text-xl font-semibold mt-2">Performance & Structure</h2>
                </div>
                <div className="text-slate-400 text-xs">{data.technical.mobileReady ? "Pass" : "Fail"}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Load Speed</p>
                  <p className="text-white text-2xl font-semibold">{data.technical.loadSpeedSeconds}s</p>
                  <p className="text-slate-500 text-xs mt-2">Core Web Vital</p>
                </div>
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Mobile Ready</p>
                  <p className="text-white text-2xl font-semibold">{data.technical.mobileReady ? "Yes" : "No"}</p>
                  <p className="text-slate-500 text-xs mt-2">Responsive layout</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Images Missing Alt</p>
                  <p className="text-white text-2xl font-semibold">{data.technical.imagesMissingAlt}</p>
                  <p className="text-slate-500 text-xs mt-2">Alt text needed</p>
                </div>
                <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Structured Data</p>
                  <p className="text-white text-2xl font-semibold">{data.technical.structuredDataFound ? "Found" : "Not Found"}</p>
                  <p className="text-slate-500 text-xs mt-2">{data.technical.structuredDataFound ? "JSON-LD schema present" : "Missing JSON-LD schema"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
