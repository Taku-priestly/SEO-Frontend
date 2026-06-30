import { useAuditHistory } from "../../hooks/useAuditHistory";
import { useNavigate } from "react-router-dom";

export default function RecentAudits() {
  const { data: audits, isLoading } = useAuditHistory();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-slate-300">Loading audits...</div>;
  }

  if (!audits || audits.length === 0) {
    return null;
  }

  const recentAudits = audits.slice(0, 3);

  const getStatusBadge = (score: number) => {
    if (score >= 70) return { text: "HIGH", color: "bg-green-500" };
    if (score >= 40) return { text: "MEDIUM", color: "bg-yellow-500" };
    return { text: "LOW", color: "bg-red-500" };
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-2xl font-bold">Recent Audits</h3>
        <button className="text-sky-300 hover:text-sky-200 text-sm">View All History</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentAudits.map((audit: any) => {
          const badge = getStatusBadge(audit.seo_score || 0);
          return (
            <div
              key={audit.audit_id}
              onClick={() => navigate(`/audit-progress/${audit.audit_id}`)}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-slate-300">🌐</span>
                <span className={`${badge.color} text-white text-xs px-2 py-1 rounded`}>
                  {badge.text}
                </span>
              </div>
              <h4 className="text-white font-semibold mb-1">{audit.url}</h4>
              <p className="text-slate-400 text-sm mb-4">{audit.keyword}</p>
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <span>{audit.created_at ? new Date(audit.created_at).toLocaleString() : "Just now"}</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
