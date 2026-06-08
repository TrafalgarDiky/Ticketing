import { motion } from 'framer-motion'
import { formatPrice } from '../data/flights'
import { Wifi, UtensilsCrossed, Luggage, Star } from 'lucide-react'

function FacilityTag({ name }) {
  const Icon = name.includes('WiFi')  ? Wifi
             : name.includes('Makan') ? UtensilsCrossed
             : Luggage
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 20,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontSize: 11, color: 'rgba(203,213,225,0.7)',
    }}>
      <Icon size={10} strokeWidth={2} />
      {name}
    </span>
  )
}

export default function FlightCard({ flight, isActive, theme, onClick }) {
  const discount = flight.originalPrice > flight.price

  return (
    <motion.div
      className="cfc"
      onClick={onClick}
      animate={{
        scale: isActive ? 1 : 0.96,
        opacity: isActive ? 1 : 0.65,
      }}
      whileHover={{ scale: isActive ? 1.02 : 0.98, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: isActive ? theme?.cardBg || 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${isActive ? (theme?.border || 'rgba(34,211,238,0.5)') : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isActive ? `0 0 32px ${theme?.glow || 'rgba(34,211,238,0.25)'}` : 'none',
      }}
    >
      {/* Badge */}
      {flight.badge && (
        <div style={{
          display: 'inline-flex', padding: '3px 10px',
          borderRadius: 20,
          background: theme?.badge?.bg || 'rgba(34,211,238,0.15)',
          border: `1px solid ${theme?.badge?.border || 'rgba(34,211,238,0.3)'}`,
          color: theme?.badge?.color || '#22D3EE',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
          marginBottom: 14,
        }}>
          {flight.badge}
        </div>
      )}

      {/* Airline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: flight.airline.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 900, color: '#fff',
        }}>
          {flight.airline.abbr}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{flight.airline.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)' }}>{flight.flightNumber}</div>
        </div>
      </div>

      {/* Route */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {/* Depart */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {flight.departTime}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(203,213,225,0.7)', marginTop: 4 }}>
            {flight.from.code}
          </div>
        </div>

        {/* Duration */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', marginBottom: 5 }}>
            {flight.duration}
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? (theme?.primary || '#22D3EE') : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
          </div>
          <div style={{
            fontSize: 10, fontWeight: 700, marginTop: 5,
            color: flight.stops === 0 ? '#34D399' : '#F59E0B',
          }}>
            {flight.stops === 0 ? 'Langsung' : `${flight.stops} Transit`}
          </div>
        </div>

        {/* Arrive */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {flight.arriveTime}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(203,213,225,0.7)', marginTop: 4 }}>
            {flight.to.code}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 14 }} />

      {/* Price + rating */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          {discount && (
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.4)', textDecoration: 'line-through', marginBottom: 1 }}>
              {formatPrice(flight.originalPrice)}
            </div>
          )}
          <div style={{ fontSize: 18, fontWeight: 900, color: isActive ? (theme?.primary || '#22D3EE') : '#fff', letterSpacing: '-0.03em' }}>
            {formatPrice(flight.price)}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(203,213,225,0.4)', marginTop: 1 }}>per orang</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={11} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>{flight.rating}</span>
        </div>
      </div>

      {/* Facilities */}
      {isActive && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
          {flight.facilities.map(f => <FacilityTag key={f} name={f} />)}
        </div>
      )}

      {/* Seats left */}
      {flight.seatsLeft < 25 && (
        <div style={{ marginTop: 10, fontSize: 10, color: '#F59E0B', fontWeight: 600 }}>
          ⚡ Sisa {flight.seatsLeft} kursi
        </div>
      )}
    </motion.div>
  )
}
