interface Section {
  title: string;
  data: Record<string, any>;
}

interface Props {
  report: {
    title?: string;
    generatedAt?: string;
    sections?: Section[];
    [key: string]: any;
  };
}

function GradeCallout({ grade }: { grade: string }) {
  const colorMap: Record<string, string> = {
    High: "bg-emerald-500",
    Medium: "bg-yellow-500",
    Low: "bg-rose-500",
  };
  const bg = colorMap[grade] ?? "bg-slate-600";
  return (
    <div className={`${bg} rounded-xl p-8 text-center`}>
      <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-2">SEO Grade</p>
      <p className="text-white text-7xl font-bold">{grade}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <p className="text-slate-400 text-xs uppercase tracking-[0.15em] mb-2">{label}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
}

function CalloutBox({ variant, title, children }: { variant: "info" | "warning" | "critical"; title: string; children: React.ReactNode }) {
  const styles = {
    info: "border-blue-500/40 bg-blue-500/10",
    warning: "border-yellow-500/40 bg-yellow-500/10",
    critical: "border-rose-500/40 bg-rose-500/10",
  };
  return (
    <div className={`border-l-4 ${styles[variant]} rounded-r-xl p-5`}>
      <p className="text-white font-semibold text-sm uppercase tracking-[0.15em] mb-2">{title}</p>
      <div className="text-slate-300 text-sm">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | number | boolean | null | undefined)[][] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-4 text-slate-400 text-xs uppercase tracking-[0.3em] text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-slate-800">
              {row.map((cell, ci) => (
                <td key={ci} className="p-4 text-white">{String(cell ?? "-")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colorMap: Record<string, string> = {
    CRITICAL: "bg-rose-500",
    HIGH: "bg-orange-500",
    MEDIUM: "bg-yellow-500",
    STRATEGIC: "bg-blue-500",
    LOW: "bg-slate-500",
  };
  const bg = colorMap[priority] ?? "bg-slate-500";
  return (
    <span className={`${bg} px-3 py-1 rounded-full text-white text-xs font-semibold`}>
      {priority}
    </span>
  );
}

function SeoGradeSection({ data }: { data: Record<string, any> }) {
  const grade = data?.grade ?? "-";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <GradeCallout grade={grade} />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <MetricCard label="Confidence" value={data?.confidence != null ? `${data.confidence}%` : "-"} />
          <MetricCard label="Predicted Backlinks" value={data?.predicted_backlinks != null ? String(data.predicted_backlinks) : "-"} />
        </div>
      </div>

      {data?.recommendations?.length > 0 && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">AI Recommendations</h4>
          <div className="space-y-3">
            {data.recommendations.map((rec: any, i: number) => (
              <CalloutBox
                key={i}
                variant={rec.priority === "CRITICAL" ? "critical" : rec.priority === "MEDIUM" ? "warning" : "info"}
                title={`${rec.title} — ${rec.impact}% lift`}
              >
                <div className="flex items-center justify-between">
                  <span>{rec.description}</span>
                  <PriorityBadge priority={rec.priority} />
                </div>
              </CalloutBox>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompetitorAnalysisSection({ data }: { data: Record<string, any> }) {
  const competitors = data?.competitors ?? [];
  const topCompetitor = data?.topCompetitor ?? data?.top_competitor;
  const featureComp = data?.featureComparison ?? data?.feature_comparison ?? [];
  const metadataIssues = data?.metadataIssues ?? data?.metadata_issues ?? [];
  const technical = data?.technical;
  const headings = data?.headings;

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Target</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard label="URL" value={data?.target_url ?? "-"} />
          <MetricCard label="Keyword" value={data?.keyword ?? "-"} />
        </div>
      </div>

      {competitors.length > 0 && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Competitors</h4>
          <DataTable
            headers={["Rank", "Domain", "Word Count", "H1", "Keyword Density", "Backlinks"]}
            rows={competitors.map((c: any) => [
              c.rank, c.domain, c.word_count ?? c.wordCount, c.h1_count ?? c.h1Count,
              c.keyword_density ?? c.keywordDensity, c.backlinks,
            ])}
          />
        </div>
      )}

      {featureComp.length > 0 && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Feature Comparison</h4>
          <DataTable
            headers={["Feature", "Your Page", "Competitor Avg", "Gap"]}
            rows={featureComp.map((f: any) => [
              f.feature, f.target, f.competitorAverage ?? f.competitor_average, f.gap,
            ])}
          />
        </div>
      )}

      {metadataIssues.length > 0 && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Metadata Issues</h4>
          <DataTable
            headers={["Field", "Status", "Message"]}
            rows={metadataIssues.map((m: any) => [
              m.field, m.status, m.message,
            ])}
          />
        </div>
      )}

      {technical && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Technical Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MetricCard label="Load Speed" value={`${technical.load_speed_seconds ?? technical.loadSpeedSeconds ?? "-"}s`} />
            <MetricCard label="Mobile Ready" value={technical.mobile_ready ?? technical.mobileReady ? "Yes" : "No"} />
            <MetricCard label="Images Missing Alt" value={String(technical.images_missing_alt ?? technical.imagesMissingAlt ?? "-")} />
            <MetricCard label="Structured Data" value={technical.structured_data_found ?? technical.structuredDataFound ? "Yes" : "No"} />
            <MetricCard label="Internal Links" value={String(technical.internal_links ?? technical.internalLinks ?? "-")} />
            <MetricCard label="Outbound Links" value={String(technical.outbound_links ?? technical.outboundLinks ?? "-")} />
          </div>
        </div>
      )}

      {headings && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Heading Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard label="H1" value={headings.h1 || "(empty)"} />
            <MetricCard label="H1 Has Keyword" value={headings.h1_has_keyword ?? headings.h1HasKeyword ? "Yes" : "No"} />
            <MetricCard label="H2 Count" value={String(headings.h2_count ?? headings.h2Count ?? "-")} />
            <MetricCard label="H2 Keyword Matches" value={String(headings.h2_keyword_matches ?? headings.h2KeywordMatches ?? "-")} />
          </div>
          {(headings.sample_h2 ?? headings.sampleH2 ?? []).length > 0 && (
            <div className="mt-4">
              <p className="text-slate-400 text-xs uppercase tracking-[0.15em] mb-2">Sample H2 Headings</p>
              <ul className="space-y-1">
                {(headings.sample_h2 ?? headings.sampleH2 ?? []).map((h: string, i: number) => (
                  <li key={i} className="text-slate-300 text-sm">• {h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RoadmapSection({ data }: { data: Record<string, any> }) {
  const tasks = data?.tasks ?? [];
  const summary = data?.summary;

  return (
    <div className="space-y-6">
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard label="Model Confidence" value={`${summary.model_confidence ?? "-"}%`} />
          <MetricCard label="Predicted Rank Shift" value={summary.predicted_rank_shift ?? "-"} />
          <MetricCard label="Next ML Sync" value={summary.next_ml_sync ?? "-"} />
        </div>
      )}

      {tasks.length > 0 && (
        <div>
          <h4 className="text-white text-base font-semibold uppercase tracking-[0.15em] mb-4">Tasks</h4>
          <div className="space-y-3">
            {tasks.map((task: any, i: number) => (
              <CalloutBox
                key={i}
                variant={task.priority === "CRITICAL" ? "critical" : task.priority === "HIGH" ? "warning" : "info"}
                title={task.title}
              >
                <div className="space-y-2">
                  <p className="text-slate-300 text-sm">{task.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <PriorityBadge priority={task.priority} />
                    <span className="text-emerald-400 font-semibold">+{task.seo_gain}% gain</span>
                    <span className="text-slate-500">Duration: {task.duration}</span>
                    <span className="text-slate-500">{task.metric}</span>
                  </div>
                </div>
              </CalloutBox>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportPreview({ report }: Props) {
  const sectionRenderers: Record<string, (data: any) => React.ReactNode> = {
    "SEO Grade": (data) => <SeoGradeSection data={data} />,
    "Competitor Analysis": (data) => <CompetitorAnalysisSection data={data} />,
    "Roadmap": (data) => <RoadmapSection data={data} />,
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-white text-3xl font-bold tracking-tight">{report.title ?? "SEO Audit Report"}</h1>
        {report.generatedAt && (
          <p className="text-slate-400 text-sm mt-2 tracking-wide">
            Generated {new Date(report.generatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {report.sections && report.sections.length > 0 ? (
        report.sections.map((section: Section, i: number) => (
          <section key={i}>
            <h2 className="text-white text-xl font-bold uppercase tracking-[0.2em] mb-6">{section.title}</h2>
            {sectionRenderers[section.title]?.(section.data) ?? (
              <pre className="text-slate-400 text-sm bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-auto">
                {JSON.stringify(section.data, null, 2)}
              </pre>
            )}
          </section>
        ))
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">No report data available.</p>
          <p className="text-slate-500 text-sm mt-2">SEO Grade: {report.seoGrade ?? report.grade ?? "-"}</p>
        </div>
      )}
    </div>
  );
}
