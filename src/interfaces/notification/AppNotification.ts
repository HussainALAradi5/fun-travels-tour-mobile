export interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: string;
  referenceType?: string;
  referenceId?: number;
  isRead: boolean;
  createdAt: string;
}
