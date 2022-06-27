import Link from "next/link";

const btnStyle =
  "inline-flex items-center px-8 py-3 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring";

const Button = ({
  link,
  onClick,
  children,
}: {
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={btnStyle}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
