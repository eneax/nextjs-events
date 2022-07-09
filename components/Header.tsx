const Header = ({ heading }: { heading: string }) => (
  <section className="max-w-screen-md px-4 py-8 mx-auto text-center lg:py-16">
    <h1 className="text-4xl font-bold sm:text-6xl">{heading}</h1>
  </section>
);

export default Header;
