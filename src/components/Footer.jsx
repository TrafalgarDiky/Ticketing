function GaJadiPergiIcon({ size = 26 }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="9" r="7" fill="#DDAA3F" />
      <circle cx="22" cy="9" r="5" fill="#F0C040" />
      <line x1="22" y1="16" x2="22" y2="36" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 4 36 Q 12 20 22 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 40 36 Q 32 20 22 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <line x1="3" y1="36" x2="41" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M 27 20 L 35 16 L 34 20.5 L 29 22 L 27 26 L 25 24 Z" fill="white" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: '#010409',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '28px 32px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <GaJadiPergiIcon size={28} />
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', display: 'block' }}>
              GaJadiPergi<span style={{ color: '#DDAA3F' }}>.com</span>
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(100,116,139,0.7)', letterSpacing: '0.06em' }}>
              Wacana Doang
            </span>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(100,116,139,0.8)', marginLeft: 8 }}>
            © 2025
          </span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {['Syarat & Ketentuan', 'Privasi', 'Bantuan', 'Karir'].map(link => (
            <a key={link} style={{
              fontSize: 13, color: 'rgba(100,116,139,0.8)',
              textDecoration: 'none', cursor: 'pointer',
              transition: 'color 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#CBD5E1' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.8)' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
