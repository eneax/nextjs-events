import * as React from "react";

const Loading = ({ text = "Loading", speed = 300 }) => {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setContent((content) =>
        content === `${text}...` ? text : `${content}.`
      );
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  return (
    <p className="absolute left-0 right-0 mt-8 text-center text-xl font-bold">
      {content}
    </p>
  );
};

export default Loading;
