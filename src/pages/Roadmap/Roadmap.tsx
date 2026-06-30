import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout
from "../../layouts/DashboardLayout";

import RoadmapTaskCard
from "../../components/Roadmap/RoadmapTaskCard";

import SeoGainChart
from "../../components/Roadmap/SeoGainChart";

import TimelineCard
from "../../components/Roadmap/TimelineCard";

import KanbanBoard
from "../../components/Roadmap/KanbanBoard";

import { useRoadmap } from "../../hooks/useRoadmap";
import { useAuditRefresh } from "../../hooks/useAuditRefresh";

export default function Roadmap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useRoadmap(id ?? "");
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
          <p>Go to your audit history and pick an audit to view its roadmap.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading roadmap...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Roadmap not found.</div>
      </DashboardLayout>
    );
  }

  const tasks = data.tasks ?? [];
  const summary = data.summary;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sky-300 uppercase tracking-[0.3em] text-xs mb-3">AI Optimization Roadmap</p>
              <h1 className="text-white text-5xl font-bold leading-tight">AI Optimization Roadmap</h1>
              <p className="text-slate-400 mt-4 max-w-2xl">Complete these ML-generated tasks to increase your SEO Quality Grade to HIGH.</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshMutation.isPending}
              className="rounded-2xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 transition disabled:opacity-50"
            >
              {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {tasks.map((task: any) => (
            <RoadmapTaskCard key={task.title} task={task} />
          ))}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
          <div className="grid grid-cols-1 gap-6">
            <SeoGainChart items={tasks} />
            <TimelineCard items={tasks} />
          </div>
          <KanbanBoard tasks={tasks} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs mb-4">Model Confidence</p>
            <p className="text-white text-4xl font-semibold">{summary?.modelConfidence ?? "-"}%</p>
            <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${summary?.modelConfidence ?? 0}%` }} />
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs mb-4">Predicted Rank Shift</p>
            <p className="text-white text-4xl font-semibold">{summary?.predictedRankShift ?? "-"}</p>
            <p className="text-slate-500 mt-3 text-sm">Expected improvement over 30 days post-implementation.</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs mb-4">Next ML Sync</p>
            <p className="text-white text-4xl font-semibold">{summary?.nextMLSync ?? "-"}</p>
            <p className="text-slate-500 mt-3 text-sm">Recalculating SERP volatility in real-time.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
