import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

interface Props {
  items: Array<{ title: string; seoGain: number }>;
}

export default function SeoGainChart({ items }: Props) {
  const data = items.map((item) => ({
    task: item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title,
    gain: item.seoGain,
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-6">Expected SEO Gain</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="task" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="gain" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
