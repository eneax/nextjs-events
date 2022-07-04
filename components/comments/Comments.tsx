import * as React from "react";

import Button from "components/Button";
import CommentList from "components/comments/CommentList";
import NewComment from "components/comments/NewComment";

const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments, eventId]);

  const toggleShowComments = () => setShowComments((prevStatus) => !prevStatus);

  return (
    <section className="max-w-2xl mx-auto text-center">
      <Button onClick={toggleShowComments}>
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && <NewComment eventId={eventId} />}

      <div className="my-4">
        {showComments && <CommentList comments={comments} />}
      </div>
    </section>
  );
};

export default Comments;
