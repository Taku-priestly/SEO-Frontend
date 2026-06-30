import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetricCard from "./MetricCard";
import { useDashboard } from "../../hooks/useDashboard";
import { useAuditHistory } from "../../hooks/useAuditHistory";
import { useAudit } from "../../hooks/useAudit";

export default function DashboardOverview() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { data: dashboard } = useDashboard();
  const { data: history } = useAuditHistory();
  const auditMutation = useAudit();

  const recentAudits = (history?.audits ?? []).slice(0, 3);
  const overview = dashboard as
    | { activeAudits: number; completedAudits: number; averageGrade: string; latestAuditId: string | null }
    | undefined;

  const getStatusBadge = (score: string | number) => {
    if (typeof score === "string") {
      const s = score.toLowerCase();
      if (s === "high" || s === "a") return { text: "HIGH", color: "text-emerald-400", bg: "bg-emerald-500/20" };
      if (s === "medium" || s === "b" || s === "c") return { text: "MEDIUM", color: "text-yellow-400", bg: "bg-yellow-500/20" };
      return { text: "LOW", color: "text-rose-400", bg: "bg-rose-500/20" };
    }
    if (score >= 70) return { text: "HIGH", color: "text-emerald-400", bg: "bg-emerald-500/20" };
    if (score >= 40) return { text: "MEDIUM", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    return { text: "LOW", color: "text-rose-400", bg: "bg-rose-500/20" };
  };

  const handleSubmit = async () => {
    if (!url || !keyword) return;
    const result = await auditMutation.mutateAsync({ url, keyword });
    navigate(`/audit-progress/${result.audit_id}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 border border-white/10 rounded-3xl p-12 backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-bold mb-4">Start Your AI SEO Audit</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Enter your webpage and target keyword. Our Machine Learning models will analyze the top 10 Google competitors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-[0.15em] block mb-3">Target Webpage URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-[0.15em] block mb-3">Target Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., best running shoes"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={auditMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
          >
            {auditMutation.isPending ? "Starting..." : "Generate AI Analysis"} ⚡
          </button>
        </div>
      </div>

      {/* Recent Audits */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Recent Audits</h2>
          <button
            onClick={() => navigate("/history")}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            View All History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAudits.length === 0 && (
            <p className="text-slate-400 col-span-3 text-center py-8">No audits yet. Start your first audit above!</p>
          )}
          {recentAudits.map((audit: any) => {
            const badge = getStatusBadge(audit.score);
            return (
              <div
                key={audit.id}
                onClick={() => {
                  localStorage.setItem("latestAuditId", audit.id);
                  navigate(`/audit-progress/${audit.id}`);
                }}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/70 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">🌍</span>
                  <span className={`text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full ${badge.bg} ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{audit.domain}</h3>
                <p className="text-slate-400 text-xs mb-4">{audit.keyword}</p>
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>{audit.createdAt ? new Date(audit.createdAt).toLocaleString() : "Just now"}</span>
                  <span className="text-slate-400 group-hover:text-blue-400 transition-colors">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Active Audits" value={String(overview?.activeAudits ?? "-")} />
        <MetricCard title="Completed" value={String(overview?.completedAudits ?? "-")} />
        <MetricCard title="Average Grade" value={overview?.averageGrade ?? "-"} />
      </div>
    </div>
  );
}
