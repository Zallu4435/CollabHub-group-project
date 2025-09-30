import { useEffect, useState } from "react";
import type { Notification } from "../types/notification.types";
export function useNotifications() {
  const [items, setItems] = useState<Notification[]>([]);
  useEffect(() => { setItems([]); }, []);
  return { items };
}
