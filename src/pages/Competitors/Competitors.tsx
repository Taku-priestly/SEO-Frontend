import { useParams } from "react-router-dom";
import DashboardLayout
from "../../layouts/DashboardLayout";

import CompetitorCard
from "../../components/analysis/CompetitorCard";

import CompetitorTable
from "../../components/analysis/CompetitorTable";

import FeatureComparison
from "../../components/analysis/FeatureComparison";

import { useCompetitors } from "../../hooks/useCompetitors";

export default function Competitors() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useCompetitors(id ?? "");

  if (!id) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Select an Audit</h2>
          <p>Go to your audit history and pick an audit to view its competitors.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading competitors...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Competitors not found.</div>
      </DashboardLayout>
    );
  }

  const tc = data.topCompetitor;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-slate-400 uppercase tracking-[0.3em] text-xs mb-2">Competitors</p>
              <h1 className="text-white text-4xl font-bold">Rank #{tc.rank}: {tc.domain}</h1>
              <p className="text-slate-400 mt-4 max-w-2xl">Competitor overview and content audit for target keyword "{data.keyword}".</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/10 transition">Full Snapshot</button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <CompetitorCard title="Google Rank" value={`#${tc.rank}`} subtitle="Top ranking competitor" />
          <CompetitorCard title="Total Backlinks" value={tc.backlinks?.toLocaleString() ?? "-"} subtitle="Link equity estimate" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-6">
            <FeatureComparison items={data.featureComparison} />
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Competitor Breakdown</h2>
          <CompetitorTable competitors={data.competitors ?? []} />
        </div>
      </div>
    </DashboardLayout>
  );
}
