import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import AuditSteps from "../../components/audit/AuditSteps";
import AuditProgressBar from "../../components/audit/AuditProgressBar";
import { useAuditStatus } from "../../hooks/useAuditStatus";

export default function AuditProgress() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useAuditStatus(id ?? "");

  useEffect(() => {
    if (data?.status === "completed" && id) {
      localStorage.setItem("latestAuditId", id);
      const timer = setTimeout(() => {
        navigate(`/analysis/${id}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data?.status, id, navigate]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300">Loading audit status...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300">Audit not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white text-xl mb-2">{data.url}</h2>
          <p className="text-slate-400">Keyword: {data.keyword}</p>
          <p className="text-slate-400 mt-1">
            Status:{" "}
            {data.status === "completed"
              ? "✅ Completed — Redirecting to analysis..."
              : data.status}
          </p>
        </div>
        <AuditProgressBar progress={data.progress} />
        <AuditSteps steps={data.steps} currentStep={data.currentStep} />
      </div>
    </DashboardLayout>
  );
}
