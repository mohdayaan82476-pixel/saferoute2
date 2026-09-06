'use client'

// Stylized illustrated map. Rendered as inline SVG so it always paints in any
// environment (no WebGL / external tiles) and matches the tan SafeRoute design.

const H_STREETS = [120, 210, 300, 390, 480, 570]
const V_STREETS = [140, 280, 420, 560, 700, 840, 980, 1120]

// Safe corridor path (the green recommended route)
const SAFE_PATH = 'M 210 560 L 210 420 L 420 420 L 420 235 L 760 235 L 980 235'
// Direct/at-risk path (used when an incident is present but not yet rerouted)
const RISK_PATH = 'M 210 560 L 560 560 L 840 470 L 980 235'

export function MapCanvas({ incident = false, reroute = false }: { incident?: boolean; reroute?: boolean }) {
  const showRisk = incident && !reroute
  const routeColor = reroute ? '#0f704b' : '#0b8b58'

  return (
    <div className="map-canvas" aria-label="SafeRoute map showing streets, safe corridor, and incident overlay">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="parkFill" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#b7cf8f" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c3d29a" stopOpacity="0.35" />
          </radialGradient>
          <radialGradient id="lowLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e5a15a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e5a15a" stopOpacity="0" />
          </radialGradient>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* base */}
        <rect x="0" y="0" width="1200" height="700" fill="#efc28e" />

        {/* park / green space */}
        <path d="M 300 120 Q 470 90 620 150 Q 700 250 600 340 Q 460 400 340 330 Q 250 240 300 120 Z" fill="url(#parkFill)" />
        <text x="430" y="230" className="svg-area-label" textAnchor="middle">EMERALD PARK</text>

        {/* river / diagonal waterway */}
        <path d="M 980 0 L 1200 260 L 1200 340 L 900 60 Z" fill="#e7b57f" opacity="0.6" />

        {/* streets */}
        <g stroke="#f6dcb0" strokeWidth="14" strokeLinecap="round">
          {H_STREETS.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
          ))}
          {V_STREETS.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="700" />
          ))}
        </g>
        {/* thin street centerlines */}
        <g stroke="#e2b483" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round">
          {H_STREETS.map((y) => (
            <line key={`hc${y}`} x1="0" y1={y} x2="1200" y2={y} />
          ))}
          {V_STREETS.map((x) => (
            <line key={`vc${x}`} x1={x} y1="0" x2={x} y2="700" />
          ))}
        </g>

        {/* diagonal boulevard */}
        <line x1="120" y1="700" x2="900" y2="120" stroke="#f2d09f" strokeWidth="20" strokeLinecap="round" />

        {/* low lighting zone when incident is active */}
        {incident && <circle cx="600" cy="430" r="150" fill="url(#lowLight)" />}

        {/* at-risk direct route */}
        {showRisk && (
          <path d={RISK_PATH} fill="none" stroke="#c92e1d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 9" opacity="0.9" />
        )}

        {/* safe corridor glow + line */}
        <path d={SAFE_PATH} fill="none" stroke="#9bd3a8" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" filter="url(#routeGlow)" />
        <path d={SAFE_PATH} fill="none" stroke={routeColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={showRisk ? '10 12' : undefined} />

        {/* origin marker */}
        <g>
          <circle cx="210" cy="560" r="12" fill="#075f88" stroke="#fff1db" strokeWidth="4" />
        </g>

        {/* incident marker */}
        {incident && (
          <g>
            <circle cx="600" cy="430" r="26" fill="#c92e1d" opacity="0.22">
              <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="430" r="11" fill="#d24520" stroke="#fff1db" strokeWidth="3" />
          </g>
        )}

        {/* destination marker */}
        <g>
          <path d="M 980 205 C 964 205 952 217 952 233 C 952 252 980 272 980 272 C 980 272 1008 252 1008 233 C 1008 217 996 205 980 205 Z" fill="#0b8b58" stroke="#fff1db" strokeWidth="3" />
          <circle cx="980" cy="233" r="7" fill="#fff1db" />
        </g>
      </svg>
    </div>
  )
}
