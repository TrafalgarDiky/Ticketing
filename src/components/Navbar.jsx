import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

function GaJadiPergiLogo({ size = 36 }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun */}
      <circle cx="22" cy="9" r="7" fill="#DDAA3F" />
      <circle cx="22" cy="9" r="5" fill="#F0C040" />
      {/* Bridge pylon */}
      <line x1="22" y1="16" x2="22" y2="36" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      {/* Left suspension cable */}
      <path d="M 4 36 Q 12 20 22 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Right suspension cable */}
      <path d="M 40 36 Q 32 20 22 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Bridge deck */}
      <line x1="3" y1="36" x2="41" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Airplane silhouette */}
      <path d="M 27 20 L 35 16 L 34 20.5 L 29 22 L 27 26 L 25 24 Z" fill="white" />
      <path d="M 31 16.5 L 35 16 L 34 20.5 Z" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const navBg = isHome && !scrolled
    ? 'rgba(2,6,23,0.35)'
    : 'rgba(15,23,42,0.96)'

  return (
    <nav className="t-nav" style={{
      background: navBg,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: scrolled || !isHome ? '1px solid rgba(255,255,255,0.08)' : 'none',
    }}>
      <div className="t-nav-inner">
        {/* Logo */}
        <Link to="/" className="t-nav-logo" style={{ textDecoration: 'none' }}>
          <GaJadiPergiLogo size={34} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="t-nav-logo-text" style={{ fontSize: 15, fontWeight: 900 }}>GaJadiPergi</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(221,170,63,0.9)', letterSpacing: '0.08em' }}>.com</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="t-nav-links">
          {[
            { label: 'Beranda', to: '/' },
            { label: 'Promo', to: '#' },
            { label: 'Bantuan', to: '#' },
            { label: 'Check-in', to: '#' },
          ].map(({ label, to }) => (
            <li key={label}>
              <a onClick={() => to !== '#' && navigate(to)} style={{ cursor: 'pointer' }}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="t-nav-right">
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', border: 'none',
            color: 'rgba(203,213,225,0.7)', fontSize: 13, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer', padding: '6px 10px',
            borderRadius: 8,
          }}>
            <Globe size={13} strokeWidth={2} /> ID
          </button>

          <button
            className="btn-ghost"
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10 }}
          >
            Masuk
          </button>

          <button
            className="btn-aurora"
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10 }}
          >
            Daftar
          </button>

          {/* Hamburger */}
          <button
            className="t-nav-burger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(15,23,42,0.98)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '12px 28px 20px',
            }}
          >
            {['Beranda', 'Promo', 'Bantuan', 'Check-in'].map(item => (
              <button key={item} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', color: 'rgba(203,213,225,0.85)',
                fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
                padding: '13px 0', cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                {item}
              </button>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Masuk</button>
              <button className="btn-aurora" style={{ flex: 1, justifyContent: 'center' }}>Daftar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
