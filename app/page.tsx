import Nav from "./components/Nav";
import Body from "./components/Body";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <><div className="w-full flex flex-col">
      <Nav />
      <Body />
      <Footer />
      </div>
    </>
  );
}