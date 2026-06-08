import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FlightCard from '../components/FlightCard'
import { generateFlights, airports, formatPrice } from '../data/flights'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const PlaneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.7.6-.4 1l2 2c.2.2.5.3.8.2L8 8.8l-3 3H3l-1 1 3 2 2 3 1-1v-2l3-3-.2 3.8c-.1.3 0 .6.2.8l2 2c.4.3.9.1 1-.4z"/>
  </svg>
)

const FILTERS = {
  airlines: [
    { code: 'GA', label: 'Garuda Indonesia', count: 1 },
    { code: 'QZ', label: 'AirAsia',          count: 1 },
    { code: 'JT', label: 'Lion Air',         count: 2 },
    { code: 'SQ', label: 'Singapore Air',    count: 1 },
    { code: 'ID', label: 'Batik Air',        count: 1 },
  ],
  times: [
    { id: 'early', label: 'Dini Hari 00–06', count: 0 },
    { id: 'morning', label: 'Pagi 06–12',    count: 3 },
    { id: 'afternoon', label: 'Siang 12–18', count: 2 },
    { id: 'night', label: 'Malam 18–24',     count: 1 },
  ],
  stops: [
    { id: '0', label: 'Langsung',    count: 5 },
    { id: '1', label: '1 Transit',   count: 1 },
    { id: '2', label: '2+ Transit',  count: 0 },
  ],
}

export default function SearchResultsPage() {
  const navigate      = useNavigate()
  const [params]      = useSearchParams()
  const from  = params.get('from') || 'CGK'
  const to    = params.get('to')   || 'DPS'
  const date  = params.get('date') || ''
  const pax   = params.get('pax')  || '1'

  const [flights, setFlights] = useState([])
  const [sortBy, setSortBy]   = useState('price')
  const [maxPrice, setMaxPrice] = useState(4000000)
  const [selectedAirlines, setSelectedAirlines] = useState(new Set())
  const [selectedStops, setSelectedStops]       = useState(new Set())

  const fromAirport = airports.find(a => a.code === from) || airports[0]
  const toAirport   = airports.find(a => a.code === to)   || airports[1]

  useEffect(() => {
    const list = generateFlights(from, to)
    setFlights(list)
  }, [from, to])

  const filteredFlights = flights
    .filter(f => f.price <= maxPrice)
    .filter(f => selectedAirlines.size === 0 || selectedAirlines.has(f.airline.code))
    .filter(f => selectedStops.size === 0 || selectedStops.has(String(f.stops)))
    .sort((a, b) => {
      if (sortBy === 'price')    return a.price - b.price
      if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
      if (sortBy === 'depart')   return a.departTime.localeCompare(b.departTime)
      if (sortBy === 'rating')   return b.rating - a.rating
      return 0
    })

  const toggleAirline = (code) => {
    setSelectedAirlines(prev => {
      const next = new Set(prev)
      next.has(code) ? next.delete(code) : next.add(code)
      return next
    })
  }
  const toggleStop = (id) => {
    setSelectedStops(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleSelect = (flight) => {
    localStorage.setItem('selectedFlight', JSON.stringify(flight))
    navigate('/booking')
  }

  const formatDate = (d) => {
    if (!d) return 'Fleksibel'
    return new Date(d).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="results-page">
      <Navbar />

      {/* Header */}
      <div className="results-header">
        <div className="results-search-bar">
          <PlaneIcon />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-100)' }}>
            {fromAirport.city} <span style={{ color: 'var(--blue-400)' }}>({from})</span>
          </span>
          <ArrowIcon />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-100)' }}>
            {toAirport.city} <span style={{ color: 'var(--blue-400)' }}>({to})</span>
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-400)', marginLeft: 4 }}>
            · {formatDate(date)} · {pax} Penumpang
          </span>
          <button
            style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--orange-400)', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onClick={() => navigate(-1)}
          >
            Ubah Pencarian
          </button>
        </div>

        <div style={{ maxWidth: 1100, margin: '20px auto 0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['06:00 – 07:35', '09:15 – 10:45', '13:30 – 15:10'].map((slot, i) => (
            <div key={i} style={{
              padding: '8px 16px',
              background: i === 0 ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${i === 0 ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 10, fontSize: 13, fontWeight: 500,
              color: i === 0 ? 'var(--blue-400)' : 'var(--text-300)',
              cursor: 'pointer', transition: 'all 0.18s ease',
            }}>
              {slot}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="results-body">
        {/* Filter Panel */}
        <aside className="filter-panel">
          <div className="filter-title">Filter</div>

          {/* Price */}
          <div className="filter-group">
            <div className="filter-group-label">Harga Maks</div>
            <div className="price-slider">
              <input
                type="range"
                className="price-slider"
                min={500000}
                max={4000000}
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div className="price-labels">
              <span>Rp 500rb</span>
              <span style={{ fontWeight: 600, color: 'var(--orange-400)' }}>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          {/* Airlines */}
          <div className="filter-group">
            <div className="filter-group-label">Maskapai</div>
            {FILTERS.airlines.map(a => (
              <div key={a.code} className="filter-option">
                <input
                  type="checkbox"
                  id={`airline-${a.code}`}
                  checked={selectedAirlines.has(a.code)}
                  onChange={() => toggleAirline(a.code)}
                />
                <label htmlFor={`airline-${a.code}`}>{a.label}</label>
                <span className="filter-count">{a.count}</span>
              </div>
            ))}
          </div>

          {/* Departure time */}
          <div className="filter-group">
            <div className="filter-group-label">Waktu Berangkat</div>
            {FILTERS.times.map(t => (
              <div key={t.id} className="filter-option">
                <input type="checkbox" id={`time-${t.id}`} />
                <label htmlFor={`time-${t.id}`}>{t.label}</label>
                <span className="filter-count">{t.count}</span>
              </div>
            ))}
          </div>

          {/* Stops */}
          <div className="filter-group">
            <div className="filter-group-label">Transit</div>
            {FILTERS.stops.map(s => (
              <div key={s.id} className="filter-option">
                <input
                  type="checkbox"
                  id={`stop-${s.id}`}
                  checked={selectedStops.has(s.id)}
                  onChange={() => toggleStop(s.id)}
                />
                <label htmlFor={`stop-${s.id}`}>{s.label}</label>
                <span className="filter-count">{s.count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setSelectedAirlines(new Set()); setSelectedStops(new Set()); setMaxPrice(4000000) }}
            style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: 10, color: 'var(--text-300)', fontSize: 13, cursor: 'pointer', transition: 'all 0.18s ease' }}
          >
            Reset Filter
          </button>
        </aside>

        {/* Results */}
        <main>
          <div className="sort-bar">
            <div className="results-count">
              Menampilkan <span>{filteredFlights.length}</span> dari {flights.length} penerbangan
            </div>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="price">Harga Termurah</option>
              <option value="duration">Durasi Tercepat</option>
              <option value="depart">Keberangkatan</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {filteredFlights.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-400)' }}>
              <PlaneIcon size={48} />
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-200)', marginTop: 16 }}>
                Tidak ada penerbangan ditemukan
              </div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Coba ubah filter atau kriteria pencarian</div>
            </div>
          ) : (
            filteredFlights.map((flight, i) => (
              <div key={flight.id} style={{ animation: `fadeInUp 0.35s ${i * 0.06}s both` }}>
                <FlightCard flight={flight} onSelect={handleSelect} />
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  )
}
