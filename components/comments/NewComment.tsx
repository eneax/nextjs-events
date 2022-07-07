import * as React from "react";
import { FiArrowRight } from "react-icons/fi";

import NotificationContext from "context/NotificationContext";

import Button from "components/Button";

const NewComment = ({ eventId }: { eventId: string }) => {
  const [isInvalid, setIsInvalid] = React.useState(false);
  const { showNotification } = React.useContext(NotificationContext);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const commentInputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const name = nameInputRef.current?.value;
    const comment = commentInputRef.current?.value;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    showNotification({
      title: "Sending...",
      message: "Saving your comment.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, comment }),
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
          message: "Your comment has been saved.",
          status: "success",
        });
        setIsInvalid(false);
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error.message || "There was an error saving your comment.",
          status: "error",
        });
      });

    event.currentTarget.reset();
  };

  return (
    <div className="mt-8 p-8 bg-white rounded-md shadow lg:p-12 lg:col-span-3">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 text-sm border-gray-200 rounded-lg"
              placeholder="Email address"
              type="email"
              id="email"
              ref={emailInputRef}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-3 text-sm border-gray-200 rounded-lg"
              placeholder="Name"
              type="text"
              id="name"
              ref={nameInputRef}
            />
          </div>
        </div>

        <div>
          <label className="sr-only" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="w-full p-3 text-sm border-gray-200 rounded-lg"
            placeholder="Write a new comment..."
            rows={8}
            id="comment"
            ref={commentInputRef}
          ></textarea>
        </div>

        {isInvalid && (
          <p className="text-red-600">Please enter a valid input!</p>
        )}

        <div className="mt-4">
          <Button>
            Submit
            <FiArrowRight className="inline-block mx-1" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
