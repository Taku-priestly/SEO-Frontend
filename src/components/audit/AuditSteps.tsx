interface Step {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
}

interface Props {
  steps: Step[];
  currentStep: string | null;
}

export default function AuditSteps({ steps, currentStep }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-xl mb-4">Pipeline Status</h2>
      {steps.length === 0 && <p className="text-slate-400">No steps available.</p>}
      {steps.map((step) => {
        const isActive = step.name === currentStep;
        const isDone = step.status === "completed";
        const isFailed = step.status === "failed";
        const icon = isFailed ? "✗" : isDone ? "✔" : isActive ? "●" : "○";
        const color = isFailed ? "text-red-400" : isDone ? "text-green-400" : isActive ? "text-blue-400" : "text-slate-500";
        return (
          <div key={step.name} className={`${color} mb-3`}>
            {icon} {step.name}
          </div>
        );
      })}
    </div>
  );
}
