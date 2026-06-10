import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import FlightCarousel from '../components/FlightCarousel'
import FlightDetailPanel from '../components/FlightDetailPanel'
import { generateFlights, airports, airlineThemes } from '../data/flights'

const DEFAULT_THEME = {
  gradient: 'linear-gradient(135deg, #020617 0%, #0F172A 60%, #020617 100%)',
  primary:  '#22D3EE',
  accent:   '#34D399',
  glow:     'rgba(34,211,238,0.35)',
  cardBg:   'rgba(34,211,238,0.1)',
  border:   'rgba(34,211,238,0.5)',
  badge:    { bg: 'rgba(34,211,238,0.15)', color: '#22D3EE', border: 'rgba(34,211,238,0.3)' },
  btnBg:    'linear-gradient(135deg,#22D3EE,#06B6D4)',
  name:     '',
}

const SORT_OPTIONS = [
  { v: 'price',  l: 'Harga Terendah' },
  { v: 'time',   l: 'Keberangkatan Lebih Awal' },
  { v: 'rating', l: 'Rating Tertinggi' },
  { v: 'duration', l: 'Durasi Terpendek' },
]

const FILTER_CHIPS = ['Semua', 'Langsung', '1 Transit', 'Garuda', 'Singapore', 'Emirates', 'Qatar', 'Etihad', 'Malaysia']

export default function ResultsPage() {
  const [params]  = useSearchParams()
  const navigate  = useNavigate()

  const from     = params.get('from') || 'CGK'
  const to       = params.get('to')   || 'DPS'
  const date     = params.get('date') || ''
  const pax      = params.get('pax')  || '1'
  const cls      = params.get('class') || 'ekonomi'

  const fromAirport = airports.find(a => a.code === from) || airports[0]
  const toAirport   = airports.find(a => a.code === to)   || airports[1]

  const [flights,     setFlights]     = useState([])
  const [loadedRoute, setLoadedRoute] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sortBy,      setSortBy]      = useState('price')
  const [activeFilter,setActiveFilter]= useState('Semua')

  const loading = loadedRoute?.from !== from || loadedRoute?.to !== to

  // Generate flights with skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlights(generateFlights(from, to))
      setLoadedRoute({ from, to })
    }, 900)
    return () => clearTimeout(timer)
  }, [from, to])

  // Sort + filter
  const filtered = useMemo(() => flights.filter(f => {
    if (activeFilter === 'Semua')    return true
    if (activeFilter === 'Langsung') return f.stops === 0
    if (activeFilter === '1 Transit')return f.stops === 1
    return f.airline.name.toLowerCase().includes(activeFilter.toLowerCase())
  }), [flights, activeFilter])

  const sortedFlights = useMemo(() => [...filtered].sort((a, b) => {
    if (sortBy === 'price')    return a.price - b.price
    if (sortBy === 'time')     return a.departTime.localeCompare(b.departTime)
    if (sortBy === 'rating')   return b.rating - a.rating
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
    return 0
  }), [filtered, sortBy])

  const theme = useMemo(() => {
    const flight = sortedFlights[activeIndex]
    if (!flight) return DEFAULT_THEME
    return airlineThemes[flight.airline.code] || DEFAULT_THEME
  }, [activeIndex, sortedFlights])

  const handleSelect = (i) => {
    setActiveIndex(i)
    // Smooth scroll to detail panel
    setTimeout(() => {
      document.getElementById('detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 200)
  }

  const formatDate = (d) => {
    if (!d) return 'Hari ini'
    const dt = new Date(d)
    return dt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div style={{
      minHeight: '100vh',
      transition: 'background 0.6s ease',
      background: theme.gradient,
    }}>
      <Navbar />

      {/* Header */}
      <div style={{
        paddingTop: 88, paddingBottom: 28,
        paddingLeft: 24, paddingRight: 24,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Back + route */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#CBD5E1', borderRadius: 10, padding: '8px 14px',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Kembali
            </button>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                {fromAirport.city} ({from}) → {toAirport.city} ({to})
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(203,213,225,0.6)', marginTop: 4 }}>
                {formatDate(date)} · {pax} Penumpang · {cls.charAt(0).toUpperCase() + cls.slice(1)}
              </p>
            </div>
          </div>

          {/* Sort + filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div className="filter-chips">
              {FILTER_CHIPS.map(chip => (
                <button
                  key={chip}
                  className={`filter-chip ${activeFilter === chip ? 'active' : ''}`}
                  onClick={() => { setActiveFilter(chip); setActiveIndex(0) }}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SlidersHorizontal size={14} color="rgba(203,213,225,0.5)" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: '7px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#CBD5E1', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', outline: 'none',
                  appearance: 'none',
                }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.v} value={o.v} style={{ background: '#0F172A' }}>{o.l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Result count */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 14, color: 'rgba(203,213,225,0.6)', marginBottom: 20 }}
          >
            Menampilkan <strong style={{ color: '#fff' }}>{sortedFlights.length}</strong> penerbangan
            {theme.name && (
              <span style={{
                marginLeft: 12, padding: '2px 10px', borderRadius: 20,
                background: theme.cardBg, border: `1px solid ${theme.border}`,
                color: theme.primary, fontSize: 12, fontWeight: 700,
              }}>
                {theme.name} dipilih
              </span>
            )}
          </motion.div>
        )}

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'flex', gap: 16, padding: '8px 0 20px', overflow: 'hidden' }}>
            {[1, 2, 3, 4].map(k => (
              <div key={k} style={{ minWidth: 280, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
                <div className="skeleton" style={{ height: 260, borderRadius: 20 }} />
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && sortedFlights.length > 0 && (
          <FlightCarousel
            flights={sortedFlights}
            activeIndex={activeIndex}
            onSelect={handleSelect}
            theme={theme}
          />
        )}

        {/* No results */}
        {!loading && sortedFlights.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '60px 0' }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>✈</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Tidak ada penerbangan ditemukan
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(203,213,225,0.5)' }}>
              Coba ubah filter atau tanggal perjalanan
            </p>
          </motion.div>
        )}

        {/* Detail panel */}
        <div id="detail-panel">
          <AnimatePresence mode="wait">
            {!loading && sortedFlights[activeIndex] && (
              <FlightDetailPanel
                key={sortedFlights[activeIndex].id}
                flight={sortedFlights[activeIndex]}
                theme={theme}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
