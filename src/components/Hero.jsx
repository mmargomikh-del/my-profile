import { useState, useEffect } from "react";

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      try {
        const heroModule = import.meta.glob('../data/hero.json');
        const heroFile = heroModule['../data/hero.json'];

        if (heroFile) {
          const module = await heroFile();
          setHeroData(module.default);
        }
      } catch (err) {
        console.error('Error loading hero:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHero();
  }, []);

  // Default fallback data
  const data = heroData || {
    name: "Margo",
    tagline: "Marketing specialist. Content, SMM, strategy. I help brands grow with clear messaging.",
    photo: null
  };

  if (loading) {
    return <header className="hero">Loading...</header>;
  }

  return (
    <header className="hero">
      <div className="hero-content">
        {data.photo && (
          <div className="hero-photo">
            <img src={data.photo} alt={data.name} />
          </div>
        )}
        <div className="hero-text">
          <h1>{data.name}</h1>
          <p>{data.tagline}</p>
        </div>
      </div>
    </header>
  );
}
