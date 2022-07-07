import * as React from "react";

import NotificationContext from "context/NotificationContext";
import Notification from "components/Notification";
import Header from "components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { notification } = React.useContext(NotificationContext);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}

      <Header />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
