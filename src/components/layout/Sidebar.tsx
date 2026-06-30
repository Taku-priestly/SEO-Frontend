import { useNavigate, useLocation } from "react-router-dom";
import { HelpCircle, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  const latestAuditId = localStorage.getItem("latestAuditId");

  const navigateTo = (basePath: string) => {
    if (latestAuditId) {
      navigate(`${basePath}/${latestAuditId}`);
    } else {
      navigate("/dashboard");
    }
  };

  const menuItems = [
    { label: "ANALYSIS", icon: "\uD83D\uDCCA", path: "/analysis" },
    { label: "ML RESULTS", icon: "\uD83E\uDD16", path: "/ml-results" },
    { label: "ROADMAP", icon: "\uD83D\uDDFA\uFE0F", path: "/roadmap" },
    { label: "REPORTS", icon: "\uD83D\uDCC4", path: "/reports" },
  ];

  return (
    <div className="w-72 bg-slate-950 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-white font-bold text-lg">⚡ SEO Insight</h1>
        <p className="text-slate-400 text-xs mt-1">INTELLIGENCE ENGINE</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigateTo(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive(item.path)
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg mt-6 font-semibold transition-colors"
        >
          <span>+</span> New Audit
        </button>
      </nav>

      <div className="border-t border-slate-800 p-4 space-y-2">
        <button
          onClick={() => alert("Help center coming soon!")}
          className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors"
        >
          <HelpCircle size={18} />
          <span className="text-sm">HELP</span>
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">LOGOUT</span>
        </button>
      </div>
    </div>
  );
}
