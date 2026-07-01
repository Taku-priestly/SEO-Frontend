import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

const steps = [
  { num: "01", title: "Enter URL & Keyword", desc: "Provide the page you want to optimize and your target search term." },
  { num: "02", title: "SERP Analysis", desc: "We fetch the top 10 Google competitors ranking for your keyword." },
  { num: "03", title: "Deep Crawl", desc: "Each page is scraped for HTML structure, metadata, headings, and content." },
  { num: "04", title: "Feature Engineering", desc: "45+ SEO features are extracted from every page for comparison." },
  { num: "05", title: "ML Classification", desc: "Our Random Forest model grades your SEO as High, Medium, or Low." },
  { num: "06", title: "Backlink Prediction", desc: "A regressor estimates how many backlinks you need for page one." },
  { num: "07", title: "Actionable Roadmap", desc: "Get a prioritized list of fixes ranked by SEO impact." },
];

const features = [
  { icon: "🔍", title: "Competitor Analysis", desc: "Benchmark against top 10 SERP competitors for any keyword." },
  { icon: "🤖", title: "ML-Powered Grading", desc: "Random Forest classifier trained on 46 SEO features for accurate page grading." },
  { icon: "🔗", title: "Backlink Estimation", desc: "Predict the link equity needed to compete on page one." },
  { icon: "📋", title: "Actionable Roadmap", desc: "Prioritized checklist of HTML and content fixes with impact scores." },
  { icon: "📊", title: "Feature Comparison", desc: "Side-by-side comparison of your page vs. competitor averages." },
  { icon: "⚡", title: "Real-Time Audit", desc: "Full 7-step pipeline runs in seconds with live progress tracking." },
];

export default function Landing() {
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-lg">SEO Insight</span>
            <span className="text-[10px] text-slate-500 tracking-[0.2em] ml-2 hidden sm:inline">INTELLIGENCE ENGINE</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI-Powered SEO Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Data-Driven SEO.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-purple-400">
              Powered by AI.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Stop guessing. Start ranking. Let our engine analyze your competitors
            and give you the exact HTML fixes you need to reach page one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              Start Your Free Audit →
            </button>
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all"
            >
              See How It Works
            </button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-slate-500 text-sm mt-1">Pages Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">46</div>
              <div className="text-slate-500 text-sm mt-1">SEO Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-slate-500 text-sm mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-xs uppercase tracking-[0.3em] mb-3">Pipeline</p>
            <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              From URL to actionable insights in seven automated steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-sky-500/30 transition-colors"
              >
                <span className="text-4xl font-black text-sky-500/30 block mb-3">{step.num}</span>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-xs uppercase tracking-[0.3em] mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold">Everything You Need</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Built for developers who want data-backed SEO decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-purple-400">Dominate</span> Search?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            Join developers who use data-driven insights to climb the rankings.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-sky-600 hover:bg-sky-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-bold text-sm">SEO Insight Engine</span>
          </div>
          <p className="text-slate-500 text-xs">
            © 2026 SEO INSIGHT ENGINE. BUILT FOR DEVELOPERS.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <button onClick={() => navigate("/login")} className="hover:text-slate-300 transition-colors">Log In</button>
            <button onClick={() => navigate("/signup")} className="hover:text-slate-300 transition-colors">Sign Up</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
