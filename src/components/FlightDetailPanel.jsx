import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/flights'
import { Wifi, UtensilsCrossed, Luggage, Star, ArrowRight } from 'lucide-react'
import garudaLogo      from '../assets/garudaLogo.png'
import singaporeLogo   from '../assets/singaporeAirlinesLogo.png'
import emiratesLogo    from '../assets/emiratesLogo.png'
import qatarLogo       from '../assets/qatarAirwaysLogo.jpg'
import etihadLogo      from '../assets/eithadAirwaysLogo.png'
import malaysiaLogo    from '../assets/malaysiaAirlinesLogo.png'

const AIRLINE_LOGOS = {
  GA: garudaLogo,
  SQ: singaporeLogo,
  EK: emiratesLogo,
  QR: qatarLogo,
  EY: etihadLogo,
  MH: malaysiaLogo,
}

function PlaneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.7.6-.4 1l2 2c.2.2.5.3.8.2L8 8.8l-3 3H3l-1 1 3 2 2 3 1-1v-2l3-3-.2 3.8c-.1.3 0 .6.2.8l2 2c.4.3.9.1 1-.4z"/>
    </svg>
  )
}

export default function FlightDetailPanel({ flight, theme }) {
  const navigate = useNavigate()

  const handleBook = () => {
    localStorage.setItem('selectedFlight', JSON.stringify(flight))
    navigate('/booking')
  }

  if (!flight) return null

  const iconMap = { 'WiFi': <Wifi size={13} />, 'Makan': <UtensilsCrossed size={13} /> }
  const themeColor = theme?.primary || '#22D3EE'
  const themeBtnBg = theme?.btnBg  || 'linear-gradient(135deg,#22D3EE,#06B6D4)'

  return (
    <motion.div
      className="fdp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderColor: theme?.border || 'rgba(34,211,238,0.25)' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: AIRLINE_LOGOS[flight.airline.code] ? '#fff' : flight.airline.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {AIRLINE_LOGOS[flight.airline.code] ? (
              <img
                src={AIRLINE_LOGOS[flight.airline.code]}
                alt={flight.airline.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5 }}
              />
            ) : (
              <span style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>{flight.airline.abbr}</span>
            )}
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{flight.airline.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(203,213,225,0.55)' }}>{flight.flightNumber} · {flight.flightClass}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Star size={14} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B' }}>{flight.rating}</span>
          <span style={{ fontSize: 12, color: 'rgba(203,213,225,0.4)', marginLeft: 2 }}>rating</span>
        </div>
      </div>

      {/* Route detail */}
      <div className="fdp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center', margin: '24px 0' }}>
        {/* Depart */}
        <div className="fdp-time" style={{ textAlign: 'center' }}>
          <div className="fdp-time-big">{flight.departTime}</div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: themeColor }}>{flight.from.code}</div>
            <div style={{ fontSize: 13, color: '#fff', marginTop: 2 }}>{flight.from.city}</div>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', marginTop: 1 }}>{flight.from.name}</div>
          </div>
        </div>

        {/* Mid */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: 'rgba(203,213,225,0.5)' }}>{flight.duration}</div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 0, width: 120 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${themeColor}40)` }} />
            <div style={{ color: themeColor }}><PlaneIcon /></div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${themeColor}40)` }} />
          </div>
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: flight.stops === 0 ? '#34D399' : '#F59E0B',
          }}>
            {flight.stops === 0 ? '✈ Langsung' : `${flight.stops} Transit`}
          </div>
        </div>

        {/* Arrive */}
        <div className="fdp-time" style={{ textAlign: 'center' }}>
          <div className="fdp-time-big">{flight.arriveTime}</div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: themeColor }}>{flight.to.code}</div>
            <div style={{ fontSize: 13, color: '#fff', marginTop: 2 }}>{flight.to.city}</div>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', marginTop: 1 }}>{flight.to.name}</div>
          </div>
        </div>
      </div>

      {/* Facilities + Info grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 16, marginBottom: 24, padding: '16px 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(203,213,225,0.5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Fasilitas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {flight.facilities.map(f => (
              <span key={f} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 20,
                background: `${themeColor}15`,
                border: `1px solid ${themeColor}30`,
                fontSize: 11, color: themeColor, fontWeight: 600,
              }}>
                {iconMap[f.split(' ')[0]] || <Luggage size={11} />}
                {f}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(203,213,225,0.5)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Info
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 13, color: '#CBD5E1' }}>Kelas: <strong style={{ color: '#fff' }}>{flight.flightClass}</strong></div>
            <div style={{ fontSize: 13, color: '#CBD5E1' }}>Bagasi: <strong style={{ color: '#fff' }}>{flight.baggage}</strong></div>
            <div style={{ fontSize: 13, color: '#CBD5E1' }}>
              Kursi tersedia: <strong style={{ color: flight.seatsLeft < 20 ? '#F59E0B' : '#34D399' }}>{flight.seatsLeft}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Price + Book */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          {flight.originalPrice > flight.price && (
            <div style={{ fontSize: 13, color: 'rgba(203,213,225,0.4)', textDecoration: 'line-through', marginBottom: 2 }}>
              {formatPrice(flight.originalPrice)}
            </div>
          )}
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
            {formatPrice(flight.price)}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(203,213,225,0.5)', marginTop: 2 }}>per orang</div>
        </div>

        <button
          onClick={handleBook}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 32px',
            background: themeBtnBg,
            color: '#fff', border: 'none', borderRadius: 14,
            fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: `0 4px 20px ${theme?.glow || 'rgba(34,211,238,0.3)'}`,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${theme?.glow || 'rgba(34,211,238,0.4)'}` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 20px ${theme?.glow || 'rgba(34,211,238,0.3)'}` }}
        >
          Pilih Penerbangan
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  )
}
