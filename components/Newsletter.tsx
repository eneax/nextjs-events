import * as React from "react";
import { FiArrowRight } from "react-icons/fi";

import NotificationContext from "context/NotificationContext";

const Newsletter = () => {
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const { showNotification } = React.useContext(NotificationContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    showNotification({
      title: "Signing up...",
      message: "Registering your email address.",
      status: "pending",
    });

    const email = emailInputRef.current?.value;

    if (email) {
      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong.");
          });
        })
        .then(() => {
          showNotification({
            title: "Success!",
            message: "You have been signed up for the newsletter.",
            status: "success",
          });
        })
        .catch((error) => {
          showNotification({
            title: "Error!",
            message:
              error.message ||
              "There was an error signing you up for the newsletter.",
            status: "error",
          });
        });
    }

    event.currentTarget.reset();
  };

  return (
    <aside className="p-12 bg-gray-100 sm:p-16 lg:p-24">
      <div className="max-w-xl mx-auto text-center">
        <p className="mt-2 text-3xl font-bold sm:text-4xl">Latest Updates</p>
        <p className="text-sm font-medium text-gray-600 mt-2">
          All the latest news, straight from the team.
        </p>

        <form className="mt-8 sm:flex" onSubmit={handleSubmit}>
          <div className="sm:flex-1">
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <input
              ref={emailInputRef}
              type="email"
              id="email"
              placeholder="Subscribe via email"
              className="appearance-none w-full p-3 border-1 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-between w-full px-5 py-3 mt-4 font-medium text-white bg-indigo-600 rounded-lg sm:w-auto sm:mt-0 sm:ml-4 hover:bg-indigo-500"
          >
            Subscribe
            <FiArrowRight className="inline-block mx-1" />
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Newsletter;
