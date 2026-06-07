import { useEffect, useState } from "react";

const PWALoader = ({ text = "Loading...", showText = true }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2400;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      const p = elapsed / duration;
      // ease in-out progress
      const eased = p < 0.82 ? p / 0.82 : 1;
      setProgress(Math.round(eased * 100));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={styles.wrap}>
      <svg
        width="340"
        height="240"
        viewBox="0 0 340 240"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.svg}
      >
        <defs>
          <clipPath id="dropClipPWA">
            <path d="M104,24 C104,24 56,86 56,126 C56,153 78,170 104,170 C130,170 152,153 152,126 C152,86 104,24 104,24Z" />
          </clipPath>
          <style>{`
            @keyframes dropPulse {
              0%,100% { transform: scale(1); }
              50%      { transform: scale(1.045); }
            }
            @keyframes boltFlash {
              0%,100% { opacity: 1; }
              42%     { opacity: 0.1; }
              56%     { opacity: 1; }
            }
            @keyframes ring1 {
              0%   { r: 64; stroke-opacity: .5;  stroke-width: 2;   }
              100% { r: 96; stroke-opacity: 0;   stroke-width: .5;  }
            }
            @keyframes ring2 {
              0%   { r: 64; stroke-opacity: .28; stroke-width: 1.5; }
              100% { r: 96; stroke-opacity: 0;   stroke-width: .3;  }
            }
            @keyframes d1 { 0%,100%{opacity:.12} 33%{opacity:1} }
            @keyframes d2 { 0%,100%{opacity:.12} 53%{opacity:1} }
            @keyframes d3 { 0%,100%{opacity:.12} 73%{opacity:1} }

            .pwa-drop-g { transform-origin: 104px 108px; animation: dropPulse 2.4s ease-in-out infinite; }
            .pwa-bolt-g { animation: boltFlash 2.4s ease-in-out infinite; }
            .pwa-r1     { animation: ring1 2.4s ease-out infinite; }
            .pwa-r2     { animation: ring2 2.4s ease-out infinite .65s; }
            .pwa-d1     { animation: d1 1.5s ease-in-out infinite; }
            .pwa-d2     { animation: d2 1.5s ease-in-out infinite .25s; }
            .pwa-d3     { animation: d3 1.5s ease-in-out infinite .5s; }
          `}</style>
        </defs>

        {/* Pulse rings */}
        <circle
          className="pwa-r1"
          cx="104"
          cy="110"
          r="64"
          fill="none"
          stroke="#2B5FAD"
          strokeWidth="2"
        />
        <circle
          className="pwa-r2"
          cx="104"
          cy="110"
          r="64"
          fill="none"
          stroke="#F5A623"
          strokeWidth="1.5"
        />

        {/* Droplet */}
        <g className="pwa-drop-g">
          <path
            d="M104,24 L104,170 C78,170 56,153 56,126 C56,86 104,24 104,24Z"
            fill="#0b476e"
          />
          <path
            d="M104,24 L104,170 C130,170 152,153 152,126 C152,86 104,24 104,24Z"
            fill="#1A6FA8"
          />
          <path
            d="M104,24 C104,24 56,86 56,126 C56,153 78,170 104,170 C130,170 152,153 152,126 C152,86 104,24 104,24Z"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1.5"
          />
        </g>

        {/* Lightning bolt */}
        <g className="pwa-bolt-g" clipPath="url(#dropClipPWA)">
          <polygon
            points="116,36 90,110 106,110 92,170 128,98 110,98"
            fill="#F5A623"
            stroke="#F5A623"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />

          <polygon
            points="116,36 107,62 113,56"
            fill="rgba(255,255,255,0.28)"
          />
        </g>
        {/* PWA text */}
        <text
          x="170"
          y="116"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="56"
          fontWeight="800"
          fill="#F5A623"
          letterSpacing="-1.5"
        >
          PWA
        </text>

        {/* TECHNOLOGY */}
        <text
          x="172"
          y="138"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="11.5"
          fontWeight="400"
          fill="rgba(255,255,255,0.55)"
          letterSpacing="6"
        >
          TECHNOLOGY
        </text>

        {/* Accent line */}
        <rect
          x="172"
          y="146"
          width="118"
          height="1.8"
          rx="1"
          fill="#F5A623"
          opacity="0.55"
        />

        {/* Loading dots */}
        <circle className="pwa-d1" cx="143" cy="185" r="4.5" fill="#F5A623" />
        <circle className="pwa-d2" cx="158" cy="185" r="4.5" fill="#F5A623" />
        <circle className="pwa-d3" cx="173" cy="185" r="4.5" fill="#F5A623" />
      </svg>

      {/* Progress bar */}
      <div style={styles.barWrap}>
        <div style={{ ...styles.barFill, width: `${progress}%` }} />
      </div>

      {showText && <p style={styles.loadingText}>{text}</p>}
    </div>
  );
};

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "100vh",
    background: "#0B1E3D",
  },
  svg: {
    overflow: "visible",
  },
  barWrap: {
    width: 148,
    height: 3,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 4,
  },
  barFill: {
    height: "100%",
    background: "#F5A623",
    borderRadius: 2,
    transition: "width 0.05s linear",
  },
  loadingText: {
    marginTop: 14,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 3,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
  },
};

export default PWALoader;
