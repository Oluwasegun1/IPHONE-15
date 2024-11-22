import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="bg-black min-h-screen m-0 p-0">
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  );
};

export default App;
