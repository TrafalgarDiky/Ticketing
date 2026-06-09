import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import { formatPrice } from '../data/flights'

const CONFETTI_COLORS = ['#22D3EE', '#A78BFA', '#34D399', '#DDAA3F', '#F87171']

const QR_CELLS = Array.from({ length: 49 }, () => Math.random() > 0.42)

export default function SuccessPage() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState(null)
  const [confetti]   = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left:  `${Math.random() * 100}%`,
      size:  Math.random() * 8 + 5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 4,
      dur:   Math.random() * 4 + 4,
    }))
  )

  useEffect(() => {
    const saved = localStorage.getItem('bookingData')
    if (saved) {
      try { setBookingData(JSON.parse(saved)) }
      catch { /* ignore */ }
    }
  }, [])

  const flight    = bookingData?.flight
  const formData  = bookingData?.formData
  const bookingId = bookingData?.bookingId || 'TRB-XXXXXX'

  const formatDateDisplay = () => {
    const d = new Date(); d.setDate(d.getDate() + 14)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, #020617 55%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <Navbar />

      {/* Confetti */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {confetti.map(p => (
          <div key={p.id} style={{
            position: 'absolute', top: -20, left: p.left,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color, opacity: 0.7,
            animation: `confettiDrop ${p.dur}s ${p.delay}s linear infinite`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        paddingTop: 110, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '100%',
      }}>
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'rgba(52,211,153,0.15)',
            border: '2px solid rgba(52,211,153,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24, position: 'relative',
          }}
        >
          {/* Pulse rings */}
          <div style={{
            position: 'absolute', inset: -14,
            borderRadius: '50%', border: '1px solid rgba(52,211,153,0.2)',
            animation: 'ringPulse 2.5s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: -28,
            borderRadius: '50%', border: '1px solid rgba(52,211,153,0.1)',
            animation: 'ringPulse 2.5s ease-in-out 1.25s infinite',
          }} />

          {/* Check SVG with draw animation */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="#34D399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 10 }}
        >
          Booking Berhasil! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ fontSize: 15, color: 'rgba(203,213,225,0.7)', textAlign: 'center', maxWidth: 420, marginBottom: 40, lineHeight: 1.65 }}
        >
          Tiket kamu sedang diproses. Detail pemesanan dapat dilihat pada ringkasan di bawah ini.
        </motion.p>

        {/* Boarding Pass */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bp-wrap"
        >
          {/* Ticket Top */}
          <div className="bp-top" style={{
            background: flight
              ? `linear-gradient(135deg, ${flight.airline.color}CC, ${flight.airline.color}99)`
              : 'linear-gradient(135deg, #1A6DB5, #0D4A8A)',
          }}>
            {/* Airline header */}
            <div className="bp-header">
              <div className="bp-airline-logo">
                {flight ? flight.airline.abbr : 'GA'}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                  {flight ? flight.airline.name : 'Garuda Indonesia'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {flight ? flight.flightNumber : 'GA-401'} · {flight ? flight.flightClass : 'Ekonomi'}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
                {bookingId}
              </div>
            </div>

            {/* Route */}
            <div className="bp-route">
              <div>
                <div className="bp-city">{flight ? flight.from.code : 'CGK'}</div>
                <div className="bp-city-name">{flight ? flight.from.city : 'Jakarta'}</div>
              </div>
              <div className="bp-mid">
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                  {flight ? flight.duration : '1j 35m'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.7.6-.4 1l2 2c.2.2.5.3.8.2L8 8.8l-3 3H3l-1 1 3 2 2 3 1-1v-2l3-3-.2 3.8c-.1.3 0 .6.2.8l2 2c.4.3.9.1 1-.4z"/>
                  </svg>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Langsung</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="bp-city">{flight ? flight.to.code : 'DPS'}</div>
                <div className="bp-city-name">{flight ? flight.to.city : 'Bali'}</div>
              </div>
            </div>
          </div>

          {/* Tear */}
          <div className="bp-tear" style={{ background: '#020617' }}>
            <div className="bp-hole" style={{ left: -14 }} />
            <div className="bp-hole" style={{ right: -14 }} />
            <div style={{
              position: 'absolute', top: '50%', left: 18, right: 18, height: 1,
              background: 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 6px, transparent 6px, transparent 12px)',
              transform: 'translateY(-50%)',
            }} />
          </div>

          {/* Ticket Bottom */}
          <div className="bp-bottom">
            <div className="bp-details">
              <div className="bp-detail">
                <span className="bp-detail-label">Penumpang</span>
                <span className="bp-detail-value">{formData?.fullName || 'Penumpang 1'}</span>
              </div>
              <div className="bp-detail">
                <span className="bp-detail-label">Tanggal</span>
                <span className="bp-detail-value">{formatDateDisplay()}</span>
              </div>
              <div className="bp-detail">
                <span className="bp-detail-label">Berangkat</span>
                <span className="bp-detail-value">{flight ? flight.departTime : '06:00'}</span>
              </div>
              <div className="bp-detail">
                <span className="bp-detail-label">Tiba</span>
                <span className="bp-detail-value">{flight ? flight.arriveTime : '07:35'}</span>
              </div>
              <div className="bp-detail">
                <span className="bp-detail-label">Bagasi</span>
                <span className="bp-detail-value">{flight ? flight.baggage : '23kg'}</span>
              </div>
              <div className="bp-detail">
                <span className="bp-detail-label">Total Harga</span>
                <span className="bp-detail-value" style={{ color: '#22D3EE' }}>
                  {flight ? formatPrice(flight.price + 45_000) : 'Rp 1.935.000'}
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 90, height: 90,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: 8,
                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
              }}>
                {QR_CELLS.map((on, i) => (
                  <div key={i} style={{ borderRadius: 1, background: on ? '#CBD5E1' : 'transparent' }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            className="btn-aurora"
            onClick={() => navigate('/')}
            style={{ fontSize: 14, padding: '12px 24px' }}
          >
            <Home size={15} strokeWidth={2.5} />
            Kembali ke Beranda
          </button>
          <button
            className="btn-ghost"
            onClick={() => window.print()}
            style={{ fontSize: 14, padding: '12px 24px' }}
          >
            <Download size={15} strokeWidth={2.5} />
            Unduh Tiket
          </button>
        </motion.div>
      </div>
    </div>
  )
}
