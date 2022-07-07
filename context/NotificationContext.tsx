import * as React from "react";

export interface NotificationType {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}

interface NotificationContextType {
  notification: NotificationType | null;
  showNotification: (notification: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = React.createContext<NotificationContextType>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    React.useState<NotificationType | null>(null);

  React.useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const contextValue = {
    notification: activeNotification,
    showNotification: (notificationData: NotificationType) =>
      setActiveNotification(notificationData),
    hideNotification: () => setActiveNotification(null),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
