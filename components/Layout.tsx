import * as React from "react";

import NotificationContext from "context/NotificationContext";
import Notification from "components/Notification";
import Header from "components/Header";
import Newsletter from "components/Newsletter";

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

      <Newsletter />

      <footer className="bg-gray-100">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto sm:px-6 lg:px-8">
          <div className="pt-8 border-t border-gray/10">
            <p className="text-xs leading-relaxed text-center text-gray-600">
              Code available on{" "}
              <a
                href="https://github.com/eneax/nextjs-events"
                className="underline transition hover:text-gray-900"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
