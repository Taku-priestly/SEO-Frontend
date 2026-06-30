import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout
from "../../layouts/DashboardLayout";

import SeoGradeCard
from "../../components/ml/SeoGradeCard";

import ConfidenceCard
from "../../components/ml/ConfidenceCard";

import PredictionCard
from "../../components/ml/PredictionCard";

import FeatureImportanceChart
from "../../components/ml/FeatureImportanceChart";

import OptimizationImpactChart
from "../../components/ml/OptimizationImpactChart";

import RecommendationSummary
from "../../components/ml/RecommendationSummary";

import { useMLResults } from "../../hooks/useMLResults";
import { useAuditRefresh } from "../../hooks/useAuditRefresh";

export default function MLResults() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useMLResults(id ?? "");
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
          <p>Go to your audit history and pick an audit to view its ML results.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">Loading ML results...</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-slate-300 p-8">ML results not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">ML Results</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshMutation.isPending}
          className="rounded-2xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 transition disabled:opacity-50"
        >
          {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-6">
        <SeoGradeCard grade={data.grade} />
        <ConfidenceCard confidence={data.confidence} />
        <PredictionCard title="Predicted Backlinks" value={data.predictedBacklinks?.toLocaleString() ?? "-"} />
        <PredictionCard title="Linking Domains" value={data.linkingDomains?.toLocaleString() ?? "-"} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <FeatureImportanceChart items={data.featureImportance ?? []} />
        <OptimizationImpactChart items={data.optimizationImpact ?? []} />
      </div>

      <RecommendationSummary items={data.recommendations ?? []} />
    </DashboardLayout>
  );
}
