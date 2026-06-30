interface Props {
  report: {
    title?: string;
    generatedAt?: string;
    sections?: Array<{ heading?: string; content?: string }>;
    [key: string]: any;
  };
}

export default function ReportPreview({ report }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
      <h2 className="text-white text-2xl mb-4">{report.title ?? "SEO Audit Report"}</h2>
      {report.generatedAt && (
        <p className="text-slate-400 text-sm mb-4">Generated: {new Date(report.generatedAt).toLocaleString()}</p>
      )}

      {report.sections && report.sections.length > 0 ? (
        report.sections.map((section: any, i: number) => (
          <div key={i} className="mb-6">
            {section.heading && <h3 className="text-white text-lg mb-2">{section.heading}</h3>}
            <p className="text-slate-300">{section.content ?? JSON.stringify(section)}</p>
          </div>
        ))
      ) : (
        <div>
          <p className="text-slate-300">SEO Grade: {report.seoGrade ?? report.grade ?? "-"}</p>
          <p className="text-slate-300 mt-2">View full report details above.</p>
        </div>
      )}
    </div>
  );
}
