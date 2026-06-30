interface Props {
  items: Array<{ title: string; duration: string }>;
}

export default function TimelineCard({ items }: Props) {
  const phases = items.map((item, i) => `Phase ${i + 1} - ${item.title}`);
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white mb-4">Implementation Timeline</h2>
      {phases.length === 0 && <p className="text-slate-400">No timeline data.</p>}
      {phases.map((phase) => (
        <div key={phase} className="py-3 border-b border-slate-800 text-slate-400">
          {phase}
        </div>
      ))}
    </div>
  );
}
