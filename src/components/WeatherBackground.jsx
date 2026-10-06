import "./WeatherBackground.css";

const RAIN_DROPS = Array.from({ length: 35 }).map((_, i) => ({
  id: i,
  left: `${(i * 2.85 + (i % 7) * 0.8) % 100}%`,
  animationDelay: `-${(i * 0.3).toFixed(2)}s`,

  animationDuration: `${1.4 + (i % 4) * 0.25}s`,
}));

const SNOWFLAKES = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${(i * 2.5 + (i % 5) * 1.2) % 100}%`,
  animationDelay: `-${(i * 0.3).toFixed(2)}s`,
  animationDuration: `${3.5 + (i % 5) * 0.8}s`,
  opacity: 0.3 + (i % 4) * 0.18,
  fontSize: `${10 + (i % 4) * 4}px`,
}));

function WeatherBackground({ weatherMain }) {
  const getBackgroundClass = () => {
    if (!weatherMain) return "bg-default";

    const main = weatherMain.toLowerCase();

    if (main.includes("rain") || main.includes("drizzle")) return "bg-rainy";
    if (main.includes("snow")) return "bg-snowy";
    if (main.includes("clear")) return "bg-clear";
    if (main.includes("cloud")) return "bg-cloudy";
    if (main.includes("thunder") || main.includes("storm")) return "bg-thunder";

    return "bg-default";
  };

  const bgClass = getBackgroundClass();

  return (
    <div className={`weather-bg ${bgClass}`}>
      {/* 1. Clear Sun Effect & Rotating Rays */}
      {bgClass === "bg-clear" && (
        <div className="sun-container">
          <div className="sun-rays" />
          <div className="sun-core" />
        </div>
      )}

      {/* 2. 3D Moving Clouds Effect */}
      {(bgClass === "bg-cloudy" ||
        bgClass === "bg-rainy" ||
        bgClass === "bg-thunder" ||
        bgClass === "bg-snowy") && (
        <div className="clouds-scene">
          <div className="cloud-shape cloud-fast" />
          <div className="cloud-shape cloud-slow" />
        </div>
      )}

      {/* 3. Lightning & Thunder Flashes */}
      {bgClass === "bg-thunder" && <div className="lightning-flash" />}

      {/* 4. Rainfall */}
      {bgClass === "bg-rainy" && (
        <div className="rain-container">
          {RAIN_DROPS.map((drop) => (
            <div
              key={drop.id}
              className="rain-drop"
              style={{
                left: drop.left,
                animationDelay: drop.animationDelay,
                animationDuration: drop.animationDuration,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Snowfall */}
      {bgClass === "bg-snowy" && (
        <div className="snow-container">
          {SNOWFLAKES.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: flake.left,
                animationDelay: flake.animationDelay,
                animationDuration: flake.animationDuration,
                opacity: flake.opacity,
                fontSize: flake.fontSize,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherBackground;
