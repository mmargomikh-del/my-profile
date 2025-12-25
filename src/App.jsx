import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <Hero />
      <Projects />
    </div>
  );
}
