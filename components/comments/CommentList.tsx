interface Comment {
  _id: string;
  comment: {
    name: string;
    comment: string;
  };
}

const CommentList = ({ comments }: { comments: Comment[] }) => (
  <div className="mt-8">
    {comments.map(({ _id, comment: { comment, name } }) => (
      <article
        key={_id}
        className="bg-white border-2 border-gray-100 rounded-xl mt-4"
      >
        <div className="flex items-start p-6">
          <div className="ml-4">
            <p className="text-sm text-gray-700 text-left">{comment}</p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Posted by{" "}
                <span className="font-medium text-gray-700">{name}</span>
              </p>
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
);

export default CommentList;
