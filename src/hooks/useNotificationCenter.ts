import toast from "react-hot-toast";
import { useNotificationStore } from "../store/notificationStore";

type Kind = "success" | "error" | "info" | "warning";

export function useNotificationCenter() {
  const add = useNotificationStore((s) => s.add);

  const notify = (kind: Kind, title: string, message?: string) => {
    add({ type: kind, title, message });

    switch (kind) {
      case "success":
        toast.success(title, { id: title });
        break;
      case "error":
        toast.error(title, { id: title });
        break;
      case "info":
        toast(title, { icon: "ℹ️", id: title });
        break;
      case "warning":
        toast(title, { icon: "⚠️", id: title });
        break;
    }
  };

  return { notify };
}
