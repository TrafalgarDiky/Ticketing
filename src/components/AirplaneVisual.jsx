import { motion } from 'framer-motion'

// Fan blade helper
function FanBlades({ cx, cy, innerR, outerR, count = 10 }) {
  return Array.from({ length: count }).map((_, i) => {
    const a = (i * Math.PI * 2) / count - Math.PI / 2
    const na = ((i + 1) * Math.PI * 2) / count - Math.PI / 2
    const mid = (a + na) / 2
    const bx = cx + Math.cos(mid) * ((innerR + outerR) / 2)
    const by = cy + Math.sin(mid) * ((innerR + outerR) / 2)
    return (
      <path
        key={i}
        d={[
          `M ${(cx + Math.cos(a) * innerR).toFixed(1)} ${(cy + Math.sin(a) * innerR).toFixed(1)}`,
          `L ${(cx + Math.cos(a) * outerR).toFixed(1)} ${(cy + Math.sin(a) * outerR).toFixed(1)}`,
          `Q ${(cx + Math.cos(mid) * (outerR + 2)).toFixed(1)} ${(cy + Math.sin(mid) * (outerR + 2)).toFixed(1)}`,
          `  ${(cx + Math.cos(na) * outerR).toFixed(1)} ${(cy + Math.sin(na) * outerR).toFixed(1)}`,
          `L ${(cx + Math.cos(na) * innerR).toFixed(1)} ${(cy + Math.sin(na) * innerR).toFixed(1)}`,
          `Q ${bx.toFixed(1)} ${by.toFixed(1)} ${(cx + Math.cos(a) * innerR).toFixed(1)} ${(cy + Math.sin(a) * innerR).toFixed(1)}`,
          'Z',
        ].join(' ')}
        fill={`rgba(60,95,175,${(0.45 + (i % 2) * 0.15).toFixed(2)})`}
        stroke="rgba(40,70,140,0.6)"
        strokeWidth="0.4"
      />
    )
  })
}

const WIN_X = [390, 370, 350, 330, 310, 290, 270, 250, 230, 210, 190, 170, 150, 130, 110, 90]

export default function AirplaneVisual({ size = 300 }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ width: size * 1.88, height: size * 0.62, position: 'relative', flexShrink: 0 }}
      animate={{ y: [0, -13, 0] }}
      transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
    >
      {/* Ground-reflection glow */}
      <div style={{
        position: 'absolute',
        bottom: -22, left: '12%',
        width: '76%', height: 38,
        background: 'radial-gradient(ellipse, rgba(34,211,238,0.14) 0%, transparent 70%)',
        filter: 'blur(16px)',
      }} />

      {/* Contrail trails */}
      {[
        { top: '43%', dy: 0,   width: 160, color: 'rgba(34,211,238,0.6)',   height: 2.5 },
        { top: '43%', dy: 9,   width: 120, color: 'rgba(167,139,250,0.45)', height: 1.5 },
        { top: '43%', dy: -7,  width: 88,  color: 'rgba(52,211,153,0.35)',  height: 1.2 },
      ].map(({ top, dy, width, color, height }, i) => (
        <div key={i} style={{
          position: 'absolute',
          right: '88%',
          top: `calc(${top} + ${dy}px)`,
          transform: 'translateY(-50%)',
          width, height,
          background: `linear-gradient(to left, ${color}, transparent)`,
          borderRadius: 4,
          filter: 'blur(1px)',
        }} />
      ))}

      <svg
        viewBox="0 0 565 300"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'relative', zIndex: 1,
          filter: [
            'drop-shadow(0 18px 36px rgba(0,0,0,0.65))',
            'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
            'drop-shadow(0 0 28px rgba(34,211,238,0.12))',
          ].join(' '),
        }}
      >
        <defs>
          {/* ── Fuselage top-to-bottom shading ── */}
          <linearGradient id="avFuse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff"/>
            <stop offset="18%"  stopColor="#fafbfc"/>
            <stop offset="55%"  stopColor="#f2f4f6"/>
            <stop offset="85%"  stopColor="#e4e9ed"/>
            <stop offset="100%" stopColor="#d4dce4"/>
          </linearGradient>

          {/* Nose section — slightly cooler tint */}
          <linearGradient id="avNose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f6f8fa"/>
            <stop offset="45%"  stopColor="#eceff2"/>
            <stop offset="100%" stopColor="#dde2e8"/>
          </linearGradient>

          {/* Upper wing — medium grey with sheen */}
          <linearGradient id="avWingU" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#dce5ed"/>
            <stop offset="50%"  stopColor="#c8d4de"/>
            <stop offset="100%" stopColor="#a0b2c0"/>
          </linearGradient>

          {/* Lower wing — darker underside */}
          <linearGradient id="avWingL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#b0c0cc"/>
            <stop offset="100%" stopColor="#7888a0"/>
          </linearGradient>

          {/* Engine nacelle — deep blue livery */}
          <linearGradient id="avNacelle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2a5cc0"/>
            <stop offset="40%"  stopColor="#1a3e96"/>
            <stop offset="100%" stopColor="#0e2260"/>
          </linearGradient>

          {/* Tail fin blue */}
          <linearGradient id="avTail" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"   stopColor="#1235a0"/>
            <stop offset="100%" stopColor="#1e50c8"/>
          </linearGradient>

          {/* Belly livery stripe */}
          <linearGradient id="avBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2060cc"/>
            <stop offset="100%" stopColor="#1038a0"/>
          </linearGradient>

          {/* Cockpit window glass */}
          <linearGradient id="avCockpit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#5ae0f5"/>
            <stop offset="100%" stopColor="#18aece"/>
          </linearGradient>

          {/* Window glass */}
          <linearGradient id="avWin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#55d8f0"/>
            <stop offset="100%" stopColor="#1ab8da"/>
          </linearGradient>

          {/* Engine intake face */}
          <radialGradient id="avIntake" cx="40%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#2540a0"/>
            <stop offset="45%"  stopColor="#121e58"/>
            <stop offset="100%" stopColor="#080e2e"/>
          </radialGradient>

          {/* Exhaust glow */}
          <radialGradient id="avExhaust" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffaa44" stopOpacity="0.6"/>
            <stop offset="60%"  stopColor="#ff6610" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        {/* ══════════ HORIZONTAL STABILISERS ══════════ */}
        {/* Upper stab */}
        <path d="M 76 108 L 10 90 L 12 104 L 76 122 Z" fill="#1e50c0"/>
        {/* Upper stab sheen */}
        <path d="M 10 90 L 76 108 L 76 112 L 10 94 Z" fill="rgba(255,255,255,0.18)"/>
        {/* Lower stab */}
        <path d="M 76 152 L 10 170 L 12 156 L 76 140 Z" fill="#1235a0"/>

        {/* ══════════ VERTICAL TAIL FIN ══════════ */}
        <path d="M 74 120 Q 72 82, 82 48 Q 104 30, 126 40 L 120 82 Q 110 100, 90 122 Z"
          fill="url(#avTail)"/>
        {/* Fin leading-edge highlight */}
        <path d="M 82 48 Q 104 30, 126 40 L 122 46 Q 104 36, 84 52 Z"
          fill="rgba(255,255,255,0.22)"/>
        {/* Fin surface sheen */}
        <path d="M 84 52 L 120 82 L 112 82 L 78 56 Z"
          fill="rgba(255,255,255,0.1)"/>
        {/* Roundel (airline logo) */}
        <circle cx="100" cy="70" r="14" fill="rgba(255,255,255,0.95)"/>
        <circle cx="100" cy="70" r="10" fill="#1235a0"/>
        <circle cx="100" cy="70" r="5.5" fill="rgba(255,255,255,0.92)"/>
        <circle cx="100" cy="70" r="2.2" fill="#1235a0"/>

        {/* ══════════ MAIN FUSELAGE ══════════ */}
        <path d="
          M 78 156
          Q 62 144, 60 128
          Q 62 112, 78 100
          L 408 90
          Q 450 88, 478 102
          Q 500 116, 492 128
          Q 500 140, 478 154
          Q 450 168, 408 166
          L 78 156 Z
        " fill="url(#avFuse)"/>

        {/* Fuselage top specular highlight (broadest — central sheen) */}
        <path d="
          M 80 102 Q 244 96, 408 92 L 408 100 Q 244 106, 80 112 Z
        " fill="rgba(255,255,255,0.52)"/>
        {/* Narrow top ridge highlight */}
        <path d="
          M 80 98 Q 244 93, 408 89 L 408 93 Q 244 97, 80 102 Z
        " fill="rgba(255,255,255,0.28)"/>
        {/* Lower shadow band */}
        <path d="
          M 80 148 Q 244 152, 408 156 L 408 162 Q 244 158, 80 154 Z
        " fill="rgba(0,0,0,0.06)"/>

        {/* ══════════ BELLY LIVERY (blue stripe) ══════════ */}
        <path d="
          M 80 152
          Q 244 156, 408 160
          Q 450 163, 478 154
          Q 450 168, 408 166
          L 80 156 Z
        " fill="url(#avBelly)"/>
        {/* Thin cheatline between white and blue */}
        <path d="
          M 80 149 Q 244 153, 408 157 L 408 160 Q 244 156, 80 152 Z
        " fill="rgba(30,80,200,0.55)"/>

        {/* ══════════ NOSE ══════════ */}
        <path d="
          M 408 90
          Q 452 88, 480 102
          Q 502 116, 494 128
          Q 502 140, 480 154
          Q 452 168, 408 166 Z
        " fill="url(#avNose)"/>
        {/* Nose tip radome */}
        <path d="
          M 472 106 Q 505 120, 494 128 Q 505 136, 472 150 Z
        " fill="#e2e6ea"/>
        {/* Nose top sheen */}
        <path d="
          M 408 90 Q 452 88, 480 102 L 478 108 Q 452 95, 408 96 Z
        " fill="rgba(255,255,255,0.32)"/>

        {/* ══════════ COCKPIT WINDOWS ══════════ */}
        {/* Captain's side */}
        <path d="M 436 107 Q 454 102, 466 110 L 468 120 Q 454 124, 436 120 Z"
          fill="url(#avCockpit)"/>
        {/* Top glass glare */}
        <path d="M 436 107 Q 454 102, 466 110 L 464 112 Q 452 107, 436 109 Z"
          fill="rgba(255,255,255,0.38)"/>
        {/* First-officer side */}
        <path d="M 464 110 Q 478 107, 486 118 L 484 126 Q 476 128, 464 120 Z"
          fill="url(#avCockpit)" fillOpacity="0.88"/>
        {/* Centre divider pillar */}
        <line x1="466" y1="110" x2="468" y2="120" stroke="#b8c5cc" strokeWidth="1.2"/>

        {/* ══════════ UPPER WING ══════════ */}
        {/* Main panel */}
        <path d="M 250 95 L 334 14 L 368 28 L 276 100 Z" fill="url(#avWingU)"/>
        {/* Trailing edge panel */}
        <path d="M 276 100 L 368 28 L 382 44 L 288 104 Z" fill="#a8b8c6"/>
        {/* Leading edge highlight */}
        <path d="M 250 95 L 334 14 L 338 18 L 254 98 Z" fill="rgba(255,255,255,0.3)"/>
        {/* Wing surface sheen */}
        <path d="M 254 96 L 336 16 L 340 22 L 258 99 Z" fill="rgba(255,255,255,0.1)"/>

        {/* Upper winglet */}
        <path d="M 334 14 Q 344 2, 356 8 L 368 28 Q 354 20, 334 14 Z" fill="#c0ccd6"/>
        <path d="M 334 14 Q 344 2, 356 8 L 352 10 Q 342 4, 336 14 Z" fill="rgba(255,255,255,0.22)"/>

        {/* ══════════ LOWER WING ══════════ */}
        <path d="M 250 162 L 334 232 L 368 220 L 276 158 Z" fill="url(#avWingL)"/>
        <path d="M 276 158 L 368 220 L 382 210 L 288 156 Z" fill="#7888a0"/>
        {/* Lower winglet */}
        <path d="M 334 232 Q 344 244, 356 238 L 368 220 Q 354 228, 334 232 Z" fill="#8898a8"/>

        {/* Wing-body fairing */}
        <path d="M 244 130 Q 264 116, 290 114 Q 302 130, 290 146 Q 264 144, 244 130 Z"
          fill="#dce6ee"/>
        <path d="M 244 130 Q 264 116, 290 114 L 290 120 Q 264 122, 246 132 Z"
          fill="rgba(255,255,255,0.18)"/>

        {/* Engine pylon */}
        <path d="
          M 284 162 Q 290 154, 302 152
          L 306 156 Q 298 156, 290 166
          Q 288 168, 284 166 Z
        " fill="#b8c4ce"/>

        {/* ══════════ ENGINE ══════════ */}
        {/* Nacelle main body */}
        <path d="
          M 260 188
          Q 272 164, 328 166
          Q 338 184, 328 202
          Q 272 204, 260 188 Z
        " fill="url(#avNacelle)"/>
        {/* Nacelle top highlight */}
        <path d="M 276 165 Q 324 165, 328 172 L 328 166 Q 324 163, 276 163 Z"
          fill="rgba(255,255,255,0.2)"/>
        {/* Nacelle bottom shadow */}
        <path d="M 276 203 Q 324 203, 328 197 L 328 202 Q 324 206, 276 206 Z"
          fill="rgba(0,0,0,0.22)"/>

        {/* Exhaust nozzle */}
        <path d="M 326 172 Q 336 184, 326 196 L 342 192 Q 352 184, 342 176 Z"
          fill="#0e1e58"/>
        {/* Exhaust hot-spot glow */}
        <ellipse cx="338" cy="184" rx="9" ry="8" fill="url(#avExhaust)"/>
        <path d="M 326 172 Q 336 184, 326 196 L 330 194 Q 338 184, 330 174 Z"
          fill="rgba(255,255,255,0.08)"/>

        {/* Intake face — large circular opening */}
        {/* Outer cowl ring */}
        <ellipse cx="262" cy="188" rx="22" ry="24" fill="#0a1540"/>
        <ellipse cx="262" cy="188" rx="22" ry="24"
          fill="none" stroke="#2a50a8" strokeWidth="3.5"/>

        {/* Fan disc + blades */}
        <ellipse cx="262" cy="188" rx="19" ry="21" fill="url(#avIntake)"/>
        <FanBlades cx={262} cy={188} innerR={4} outerR={18} count={11} />

        {/* Spinner cone */}
        <ellipse cx="262" cy="188" rx="5" ry="5.5" fill="#1e3a90"/>
        <ellipse cx="261" cy="186" rx="2.5" ry="2" fill="rgba(255,255,255,0.35)"/>

        {/* Inner cowl rim rim */}
        <ellipse cx="262" cy="188" rx="19" ry="21"
          fill="none" stroke="rgba(50,90,180,0.4)" strokeWidth="1.2"/>

        {/* ══════════ PASSENGER WINDOWS ══════════ */}
        {WIN_X.map((x, i) => {
          const fade = Math.max(0.12, 0.9 - i * 0.045)
          return (
            <g key={x}>
              {/* Window surround frame */}
              <rect x={x - 8} y={118} width={16} height={14} rx={4.5}
                fill="#ccd5dc" opacity={fade * 0.95}/>
              {/* Glass */}
              <rect x={x - 6.5} y={119.5} width={13} height={11} rx={3.5}
                fill="url(#avWin)" fillOpacity={fade * 0.85}/>
              {/* Glass top reflection */}
              <rect x={x - 5.5} y={120} width={11} height={4} rx={2}
                fill="rgba(255,255,255,0.45)" fillOpacity={fade * 0.7}/>
            </g>
          )
        })}

        {/* ══════════ FUSELAGE DETAILS ══════════ */}
        {/* Door seam lines */}
        {[138, 322, 388].map(x => (
          <line key={x} x1={x} y1={100} x2={x} y2={158}
            stroke="rgba(185,200,212,0.45)" strokeWidth="0.6"/>
        ))}

        {/* Top antennas */}
        <rect x="252" y="86" width="3"   height="7" rx="1" fill="rgba(110,125,138,0.75)"/>
        <rect x="355" y="83" width="2.5" height="8" rx="1" fill="rgba(110,125,138,0.6)"/>

        {/* VHF blade antenna (belly) */}
        <path d="M 280 157 L 286 168 L 292 157" fill="none"
          stroke="rgba(150,165,178,0.6)" strokeWidth="0.8"/>

        {/* Overwing emergency exit windows (slightly smaller, above wing root) */}
        <rect x={243} y={116} width={13} height={11} rx={3.5}
          fill="url(#avWin)" fillOpacity="0.5"/>
        <rect x={284} y={113} width={13} height={11} rx={3.5}
          fill="url(#avWin)" fillOpacity="0.4"/>
      </svg>
    </motion.div>
  )
}
