import {
 PieChart,
 Pie,
 Tooltip,
 ResponsiveContainer
} from "recharts";

interface Props {
  items: Array<{ label: string; current: number; predicted: number }>;
}

export default function OptimizationImpactChart({ items }: Props) {
  const data = items.map((item) => ({
    name: item.label,
    value: Math.round((item.predicted - item.current) * 100),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-6">Optimization Impact</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={data} dataKey="value" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
