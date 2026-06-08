export default function AirplaneWindow({ width = 180, height = 240, floatClass = 'float-1', showWing = true }) {
  const stars = Array.from({ length: 8 }, (_, i) => ({
    key: i,
    size: Math.random() * 2 + 1,
    top:  Math.random() * 22 + 2,
    left: Math.random() * 90 + 2,
    delay: Math.random() * 3,
    dur:   Math.random() * 2 + 2,
  }))

  return (
    <div className={`window-wrap ${floatClass}`} style={{ width, height }}>
      {/* Outer window frame */}
      <div className="window-outer" style={{ borderRadius: width / 2 }}>
        {/* Inner seal */}
        <div className="window-inner" style={{ borderRadius: width / 2 - 10 }}>
          {/* Glass opening */}
          <div className="window-glass" style={{ borderRadius: width / 2 - 18 }}>
            {/* Sky scene */}
            <div className="window-sky" style={{ height: height - 36 }}>

              {/* Tiny stars in dark sky area */}
              {stars.map(s => (
                <div
                  key={s.key}
                  className="window-star"
                  style={{
                    width: s.size, height: s.size,
                    top: `${s.top}%`, left: `${s.left}%`,
                    animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
                  }}
                />
              ))}

              {/* Sun glow + sun disk */}
              <div className="window-sun-glow" />
              <div className="window-sun" />

              {/* Clouds */}
              <div className="cloud-base c1" />
              <div className="cloud-base c2" />
              <div className="cloud-base c3" />
              <div className="cloud-base c4" />

              {/* Wing */}
              {showWing && (
                <div className="window-wing">
                  <svg viewBox="0 0 260 90" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Wing top surface */}
                    <path d="M 0 90 L 240 14 L 260 28 L 18 90 Z" fill="#DDE1E7"/>
                    {/* Wing underside */}
                    <path d="M 4 90 L 260 28 L 260 50 L 10 90 Z" fill="#9BA3AF"/>
                    {/* Engine pod */}
                    <ellipse cx="152" cy="32" rx="28" ry="11" fill="#A0A8B2"/>
                    <ellipse cx="152" cy="32" rx="22" ry="8"  fill="#7E8896"/>
                    <ellipse cx="152" cy="32" rx="10" ry="5"  fill="#5E6470"/>
                    {/* Wing tip strobe light */}
                    <circle
                      cx="250" cy="17" r="5"
                      fill="#FF4444"
                      style={{ animation: 'navLightBlink 1.6s ease-in-out infinite' }}
                    />
                    {/* Golden-hour reflection on wing */}
                    <path d="M 0 90 L 240 14 L 260 28 L 18 90 Z" fill="url(#wingGold)" opacity="0.18"/>
                    <defs>
                      <linearGradient id="wingGold" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0"/>
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}

              {/* Glass reflection overlay */}
              <div className="window-reflection" />
            </div>
          </div>
        </div>
      </div>

      {/* Screws at corners */}
      <div className="screw" style={{ top: 14, left: 14 }} />
      <div className="screw" style={{ top: 14, right: 14 }} />
      <div className="screw" style={{ bottom: 14, left: 14 }} />
      <div className="screw" style={{ bottom: 14, right: 14 }} />
    </div>
  )
}
