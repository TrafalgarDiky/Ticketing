import { motion } from 'framer-motion'
import { Plane, ArrowDown, ShieldCheck, Tag, Clock } from 'lucide-react'
import AirplaneVisual from './AirplaneVisual'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function HeroSection({ onScrollToSearch }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 68,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '60px 28px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
        width: '100%',
      }}
      className="hero-main-grid"
      >
        {/* LEFT: Text content */}
        <div>
          {/* Title */}
          <motion.h1 {...fadeUp(0.15)} style={{
            fontSize: 'clamp(38px, 5.5vw, 68px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: 20,
          }}>
            GaJadiPergi{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #A78BFA 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}>
              Tiket Murah,<br />Wacana Mahal.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.32)} style={{
            fontSize: 16,
            color: 'rgba(203,213,225,0.8)',
            lineHeight: 1.75,
            maxWidth: 440,
            marginBottom: 36,
          }}>
            Temukan tiket pesawat terbaik ke destinasi favoritmu dengan pengalaman
            pencarian yang cepat, mudah, dan menyenangkan.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.44)} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button
              className="btn-aurora"
              onClick={onScrollToSearch}
              style={{ fontSize: 15, padding: '14px 30px' }}
            >
              <Plane size={16} strokeWidth={2.5} />
              Cari Tiket
            </button>
            <button className="btn-ghost" style={{ fontSize: 14, padding: '13px 22px' }}>
              Lihat Promo
            </button>
          </motion.div>

          {/* Benefits */}
          <motion.div {...fadeUp(0.56)} style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { icon: <Tag size={13} />, text: 'Harga terbaik' },
              { icon: <ShieldCheck size={13} />, text: 'Pembayaran aman' },
              { icon: <Clock size={13} />, text: 'Dukungan 24/7' },
            ].map(({ icon, text }) => (
              <div key={text} className="benefit-item">
                <span style={{ color: '#22D3EE' }}>{icon}</span>
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Airplane visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Glow rings behind plane */}
          <div style={{
            position: 'absolute',
            width: 320, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)',
            filter: 'blur(24px)',
          }} />
          <div style={{
            position: 'absolute',
            width: 210, height: 210,
            borderRadius: '50%',
            border: '1px solid rgba(34,211,238,0.1)',
            animation: 'ringPulse 4s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            border: '1px solid rgba(167,139,250,0.07)',
            animation: 'ringPulse 4s ease-in-out 2s infinite',
          }} />

          <AirplaneVisual size={300} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onScrollToSearch}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8, cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(203,213,225,0.5)', letterSpacing: '0.1em' }}>
          GULIR KE BAWAH
        </span>
        <div style={{ animation: 'scrollBounce 1.8s ease-in-out infinite' }}>
          <ArrowDown size={18} color="rgba(34,211,238,0.6)" strokeWidth={2} />
        </div>
      </motion.div>

      {/* Responsive style */}
      <style>{`
        .hero-main-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .hero-main-grid {
            grid-template-columns: 1fr;
          }
          .hero-main-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
