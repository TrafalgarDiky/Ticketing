import { motion } from 'framer-motion'
import { formatPrice } from '../data/flights'
import { ArrowRight } from 'lucide-react'

export default function SummaryCard({ flight, formData, onBook, loading }) {
  if (!flight) return (
    <div className="sc-wrap">
      <p style={{ color: 'rgba(203,213,225,0.5)', fontSize: 14 }}>Tidak ada penerbangan dipilih.</p>
    </div>
  )

  const serviceCharge = 45_000
  const baggageExtra  = formData?.baggage   ? 150_000 : 0
  const mealExtra     = formData?.meal      ? 80_000  : 0
  const insurance     = formData?.insurance ? 50_000  : 0
  const total         = flight.price + serviceCharge + baggageExtra + mealExtra + insurance

  return (
    <motion.div
      className="sc-wrap"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sc-title">Ringkasan Pemesanan</div>

      {/* Mini flight card */}
      <div className="sc-flight-mini">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: flight.airline.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 900, color: '#fff', flexShrink: 0,
          }}>
            {flight.airline.abbr}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{flight.airline.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)' }}>{flight.flightNumber}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{flight.departTime}</div>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.6)' }}>{flight.from.code}</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.4)' }}>{flight.duration}</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '5px 0' }} />
            <div style={{ fontSize: 10, color: flight.stops === 0 ? '#34D399' : '#F59E0B' }}>
              {flight.stops === 0 ? 'Langsung' : `${flight.stops} Transit`}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{flight.arriveTime}</div>
            <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.6)' }}>{flight.to.code}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {flight.flightClass} · {flight.baggage} bagasi
        </div>
      </div>

      {/* Price breakdown */}
      <div>
        <div className="sc-row">
          <span className="sc-label">Harga tiket</span>
          <span className="sc-value">{formatPrice(flight.price)}</span>
        </div>
        <div className="sc-row">
          <span className="sc-label">Biaya layanan</span>
          <span className="sc-value">{formatPrice(serviceCharge)}</span>
        </div>
        {baggageExtra > 0 && (
          <div className="sc-row">
            <span className="sc-label">Bagasi tambahan</span>
            <span className="sc-value">{formatPrice(baggageExtra)}</span>
          </div>
        )}
        {mealExtra > 0 && (
          <div className="sc-row">
            <span className="sc-label">Makanan premium</span>
            <span className="sc-value">{formatPrice(mealExtra)}</span>
          </div>
        )}
        {insurance > 0 && (
          <div className="sc-row">
            <span className="sc-label">Asuransi perjalanan</span>
            <span className="sc-value">{formatPrice(insurance)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="sc-total">
        <span className="sc-total-label">Total</span>
        <span className="sc-total-value">{formatPrice(total)}</span>
      </div>

      {/* Book button */}
      <button
        className="sc-book-btn"
        onClick={onBook}
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? 'Memproses...' : 'Lanjut ke Pembayaran'}
        {!loading && <ArrowRight size={16} strokeWidth={2.5} />}
      </button>

      {/* Security note */}
      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(203,213,225,0.4)', textAlign: 'center', lineHeight: 1.5 }}>
        🔒 Pembayaran 100% aman dan terenkripsi
      </div>
    </motion.div>
  )
}
