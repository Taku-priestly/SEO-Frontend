import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

interface Props {
  items: Array<{ feature: string; importance: number }>;
}

export default function FeatureImportanceChart({ items }: Props) {
  const data = items.map((item) => ({
    feature: item.feature,
    score: Math.round(item.importance * 100),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-6">Feature Importance</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
