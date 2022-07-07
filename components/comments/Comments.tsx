import * as React from "react";

import Button from "components/Button";
import CommentList from "components/comments/CommentList";
import NewComment from "components/comments/NewComment";
import Loading from "components/Loading";

const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
        });
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
        {showComments && !isLoading && <CommentList comments={comments} />}
        {showComments && isLoading && <Loading text="Loading comments" />}
      </div>
    </section>
  );
};

export default Comments;
