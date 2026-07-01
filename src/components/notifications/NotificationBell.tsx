import { useState, useRef, useEffect } from "react";
import { Bell, BellDot, CheckCheck, Trash2 } from "lucide-react";
import { useNotificationStore, type Notification } from "../../store/notificationStore";

const iconMap: Record<Notification["type"], string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const dismiss = useNotificationStore((s) => s.dismiss);
  const clearAll = useNotificationStore((s) => s.clearAll);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-slate-400 hover:text-white transition-colors relative"
        aria-label="Notifications"
      >
        {unread > 0 ? <BellDot size={20} /> : <Bell size={20} />}
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-white text-sm font-semibold">Notifications</h3>
            <div className="flex gap-2">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Clear all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    if (!n.read) markRead(n.id);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                    !n.read ? "bg-sky-500/5" : ""
                  }`}
                >
                  <span className="mt-0.5 text-base">{iconMap[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${!n.read ? "text-white font-medium" : "text-slate-300"}`}>
                      {n.title}
                    </p>
                    {n.message && (
                      <p className="text-slate-500 text-xs truncate mt-0.5">{n.message}</p>
                    )}
                  </div>
                  <span className="text-slate-600 text-[10px] shrink-0 mt-1">
                    {timeAgo(n.timestamp)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(n.id);
                    }}
                    className="text-slate-600 hover:text-slate-400 transition-colors shrink-0 mt-0.5"
                    title="Dismiss"
                  >
                    <Trash2 size={12} />
                  </button>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
