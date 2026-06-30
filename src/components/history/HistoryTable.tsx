import { useNavigate } from "react-router-dom";

interface Audit {
  id: string;
  domain: string;
  keyword: string;
  score: string;
  createdAt: string;
}

export default function HistoryTable({ audits }: { audits: Audit[] }) {
  const navigate = useNavigate();

  const handleView = (auditId: string) => {
    localStorage.setItem("latestAuditId", auditId);
    navigate(`/analysis/${auditId}`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4">Domain</th>
            <th>Keyword</th>
            <th>SEO Grade</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id} className="border-t border-slate-800">
              <td className="p-4">{audit.domain}</td>
              <td>{audit.keyword}</td>
              <td>{audit.score}</td>
              <td>{audit.createdAt}</td>
              <td>
                <button
                  onClick={() => handleView(audit.id)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
