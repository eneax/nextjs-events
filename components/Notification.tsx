import * as React from "react";
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi";

import NotificationContext, {
  NotificationType,
} from "context/NotificationContext";

const Notification = ({ title, message, status }: NotificationType) => {
  const { hideNotification } = React.useContext(NotificationContext);

  let alertStyles = "";
  let bgIconStyles = "";
  let alertIcon = null;

  if (status === "success") {
    alertStyles = "text-green-700 border-green-900/10 bg-green-50";
    bgIconStyles = "bg-green-600";
    alertIcon = <FiCheckCircle />;
  }

  if (status === "error") {
    alertStyles = "text-red-700 border-red-900/10 bg-red-50";
    bgIconStyles = "bg-red-600";
    alertIcon = <FiAlertTriangle />;
  }

  if (status === "pending") {
    alertStyles = "text-sky-700 border-sky-900/10 bg-sky-50";
    bgIconStyles = "bg-sky-600";
    alertIcon = <FiInfo />;
  }

  return (
    <div
      className={`fixed bottom-0 left-2/4 -translate-x-1/2 mx-auto mb-4 z-50 flex items-center justify-between gap-4 p-4 border rounded ${alertStyles}`}
      role="alert"
    >
      <div className="flex items-center gap-4">
        <span className={`p-2 text-white ${bgIconStyles} rounded-full`}>
          {alertIcon}
        </span>

        <p>
          <strong className="text-sm font-medium">{title}</strong>
          <span className="block text-xs opacity-90">{message}</span>
        </p>
      </div>

      {status !== "pending" && (
        <button className="opacity-90" type="button" onClick={hideNotification}>
          <span className="sr-only">Close</span>
          <FiX />
        </button>
      )}
    </div>
  );
};

export default Notification;
