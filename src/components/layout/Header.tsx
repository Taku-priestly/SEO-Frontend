import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="bg-slate-950 border-b border-slate-800 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-12">
        <h1 className="text-white font-bold text-lg">SEO Insight</h1>
        <nav className="flex gap-8">
          <button
            onClick={() => navigate("/dashboard")}
            className={`text-sm font-medium transition-colors ${
              isActive("/dashboard")
                ? "text-white border-b-2 border-blue-600 pb-4"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/audit")}
            className={`text-sm font-medium transition-colors ${
              isActive("/audit")
                ? "text-white border-b-2 border-blue-600 pb-4"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Audits
          </button>
          <button
            onClick={() => navigate("/settings")}
            className={`text-sm font-medium transition-colors ${
              isActive("/settings")
                ? "text-white border-b-2 border-blue-600 pb-4"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white">🔔</button>
        <img 
          src={profile.profilePicture || "https://i.pravatar.cc/40?u=admin"} 
          alt="Profile" 
          className="rounded-full w-8 h-8 object-cover cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
}