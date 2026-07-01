import { create } from "zustand";

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  timestamp: number;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  add: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

let counter = 0;

export const useNotificationStore =
create<NotificationState>((set) => ({
  notifications: [],

  add: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: `notif-${++counter}`,
          timestamp: Date.now(),
          read: false,
        },
        ...s.notifications,
      ],
    })),

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  dismiss: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),
}));
