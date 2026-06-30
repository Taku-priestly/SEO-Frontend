interface Props {
  items: Array<{
    feature: string;
    target: number | string;
    competitorAverage: number | string;
    gap?: number | string;
  }>;
}

export default function FeatureComparison({ items }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-6">Feature Comparison</h2>
      {items.map((item) => (
        <div key={item.feature} className="flex justify-between border-b border-slate-800 py-4">
          <span className="text-slate-300">{item.feature}</span>
          <span className="text-white">{item.target}</span>
          <span className="text-white">{item.competitorAverage}</span>
        </div>
      ))}
    </div>
  );
}
