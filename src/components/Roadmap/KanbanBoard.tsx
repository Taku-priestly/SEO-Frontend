interface Props {
  tasks: Array<{ title: string; status?: string }>;
}

export default function KanbanBoard({ tasks }: Props) {
  const todo = tasks.filter((t) => !t.status || t.status === "todo").map((t) => t.title);
  const inProgress = tasks.filter((t) => t.status === "in_progress" || t.status === "running").map((t) => t.title);
  const done = tasks.filter((t) => t.status === "completed" || t.status === "done").map((t) => t.title);

  const col = (title: string, items: string[], color: string) => (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className={`${color} mb-4`}>{title}</h3>
      {items.length === 0 && <p className="text-slate-500 text-sm">No tasks</p>}
      {items.map((item) => (
        <div key={item} className="bg-slate-800 p-3 rounded mb-3">{item}</div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {col("To Do", todo, "text-red-400")}
      {col("In Progress", inProgress, "text-yellow-400")}
      {col("Completed", done, "text-green-400")}
    </div>
  );
}
