import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuditHistory } from "../../hooks/useAuditHistory";

export default function NewAudit() {
  const navigate = useNavigate();
  const { data, isLoading } = useAuditHistory();

  const getGradeInfo = (score: string | number) => {
    const s = typeof score === "number" ? score : 0;
    if (s >= 70) return { label: "HIGH GRADE", color: "text-emerald-400", bg: "bg-emerald-500/20" };
    if (s >= 40) return { label: "MEDIUM GRADE", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    return { label: "LOW GRADE", color: "text-rose-400", bg: "bg-rose-500/20" };
  };

  const projects = (data?.audits ?? []).map((a: { domain: string; keyword: string; score: string | number; createdAt: string; id: string }) => ({
    domain: a.domain,
    keyword: a.keyword,
    grade: getGradeInfo(a.score),
    date: a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }) : "",
    auditId: a.id,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-white text-4xl font-bold mb-3">Your SEO Projects & Audits</h1>
            <p className="text-slate-400 text-base max-w-2xl">Manage and monitor the performance of your domains and keyword rankings through automated architectural audits.</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            + New Audit
          </button>
        </div>

        {isLoading && <p className="text-slate-400">Loading projects...</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project: { domain: string; keyword: string; grade: { label: string; color: string; bg: string }; date: string; auditId: string }, index: number) => (
            <div
              key={project.auditId ?? index}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/70 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">🌐</span>
                <span className={`text-[10px] uppercase tracking-[0.1em] font-bold px-3 py-1 rounded-full ${project.grade.bg} ${project.grade.color}`}>
                  {project.grade.label}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-400 transition-colors">{project.domain}</h3>
              <p className="text-slate-400 text-xs mb-4">Target Keyword: <span className="text-slate-300">"{project.keyword}"</span></p>
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <span>📅</span>
                <span>{project.date}</span>
              </div>
              <button
                onClick={() => navigate(`/audit-progress/${project.auditId}`)}
                className="w-full text-center py-2 border-t border-white/10 pt-4 text-slate-300 hover:text-blue-400 text-xs font-semibold transition-colors"
              >
                Open Project Dashboard →
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
            <p className="text-slate-400 text-xs uppercase tracking-[0.15em] mb-4">CURRENT USAGE</p>
            <h3 className="text-white text-3xl font-bold mb-4">{data?.audits?.length ?? 0} / 50 <span className="text-sm font-normal text-slate-400">audits total</span></h3>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(((data?.audits?.length ?? 0) / 50) * 100, 100)}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 hover:bg-slate-900/70 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">AI Summarizer</h3>
                <p className="text-slate-400 text-sm">Generate monthly report for all projects</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-blue-400 transition-colors">→</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
