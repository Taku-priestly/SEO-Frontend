interface Props {
  items: Array<{ title: string; description: string; priority: string; impact: number }>;
}

export default function RecommendationSummary({ items }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-4">AI Recommendations</h2>
      {items.length === 0 && <p className="text-slate-400">No recommendations available.</p>}
      {items.map((item) => (
        <div key={item.title} className="py-3 border-b border-slate-800">
          ✓ {item.title}
        </div>
      ))}
    </div>
  );
}
