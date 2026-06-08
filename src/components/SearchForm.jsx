import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowLeftRight, Calendar, Users, ChevronDown } from 'lucide-react'
import { airports } from '../data/flights'

export default function SearchForm({ initialValues = {}, compact = false }) {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState('oneway')
  const [from, setFrom]         = useState(initialValues.from || 'CGK')
  const [to, setTo]             = useState(initialValues.to   || 'DPS')
  const [date, setDate]         = useState(initialValues.date || '')
  const [flightClass, setFlightClass] = useState('ekonomi')
  const [adults, setAdults]     = useState(parseInt(initialValues.pax) || 1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants]   = useState(0)
  const [paxOpen, setPaxOpen]   = useState(false)
  const paxRef = useRef(null)

  const totalPax = adults + children + infants

  useEffect(() => {
    const handler = (e) => {
      if (paxRef.current && !paxRef.current.contains(e.target)) setPaxOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSwap = () => { setFrom(to); setTo(from) }

  const handleSearch = () => {
    if (!date) {
      const d = new Date(); d.setDate(d.getDate() + 7)
      const iso = d.toISOString().split('T')[0]
      navigate(`/results?from=${from}&to=${to}&date=${iso}&pax=${totalPax}&class=${flightClass}`)
    } else {
      navigate(`/results?from=${from}&to=${to}&date=${date}&pax=${totalPax}&class=${flightClass}`)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const classOptions = [
    { value: 'ekonomi',  label: 'Ekonomi' },
    { value: 'bisnis',   label: 'Bisnis' },
    { value: 'pertama',  label: 'Kelas Satu' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="search-glass-card"
    >
      {/* Trip type tabs */}
      {!compact && (
        <div className="sf-tabs">
          {[
            { v: 'oneway',  l: 'Sekali Jalan' },
            { v: 'return',  l: 'Pulang Pergi' },
            { v: 'multi',   l: 'Multi Kota' },
          ].map(({ v, l }) => (
            <button
              key={v}
              className={`sf-tab ${tripType === v ? 'active' : ''}`}
              onClick={() => setTripType(v)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {/* Fields grid */}
      <div className="sf-grid">
        {/* FROM */}
        <div className="sf-field">
          <label className="sf-label">Dari mana</label>
          <select
            className="sf-input"
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={{ backgroundImage: 'none' }}
          >
            {airports.map(a => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </select>
        </div>

        {/* SWAP */}
        <button className="sf-swap" onClick={handleSwap} aria-label="Tukar kota asal dan tujuan">
          <ArrowLeftRight size={15} strokeWidth={2.5} />
        </button>

        {/* TO */}
        <div className="sf-field">
          <label className="sf-label">Ke mana</label>
          <select
            className="sf-input"
            value={to}
            onChange={e => setTo(e.target.value)}
            style={{ backgroundImage: 'none' }}
          >
            {airports.map(a => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div className="sf-field">
          <label className="sf-label">Tanggal Pergi</label>
          <input
            type="date"
            className="sf-input"
            value={date}
            min={today}
            onChange={e => setDate(e.target.value)}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* PASSENGERS */}
        <div className="sf-pax-wrapper" ref={paxRef}>
          <div className="sf-field">
            <label className="sf-label">Penumpang & Kelas</label>
            <div
              className="sf-pax-display"
              onClick={() => setPaxOpen(v => !v)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setPaxOpen(v => !v)}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {totalPax} Penumpang • {classOptions.find(c => c.value === flightClass)?.label}
              </span>
              <ChevronDown size={14} color="rgba(203,213,225,0.5)" />
            </div>
          </div>

          {paxOpen && (
            <div className="sf-pax-popup">
              {[
                { label: 'Dewasa',     sub: '12+ tahun',       val: adults,   set: setAdults,   min: 1 },
                { label: 'Anak-anak', sub: '2–11 tahun',       val: children, set: setChildren, min: 0 },
                { label: 'Bayi',      sub: 'Di bawah 2 tahun', val: infants,  set: setInfants,  min: 0 },
              ].map(row => (
                <div className="sf-pax-row" key={row.label}>
                  <div>
                    <div className="sf-pax-label">{row.label}</div>
                    <div className="sf-pax-sub">{row.sub}</div>
                  </div>
                  <div className="sf-pax-ctrl">
                    <button
                      className="sf-pax-btn"
                      onClick={() => row.set(v => Math.max(row.min, v - 1))}
                      disabled={row.val <= row.min}
                    >
                      −
                    </button>
                    <span className="sf-pax-num">{row.val}</span>
                    <button className="sf-pax-btn" onClick={() => row.set(v => v + 1)}>+</button>
                  </div>
                </div>
              ))}

              {/* Class selector */}
              <div className="sf-pax-row" style={{ marginTop: 6 }}>
                <span className="sf-pax-label">Kelas</span>
                <select
                  value={flightClass}
                  onChange={e => setFlightClass(e.target.value)}
                  style={{
                    padding: '6px 10px', borderRadius: 9,
                    border: '1.5px solid rgba(34,211,238,0.3)',
                    background: 'rgba(34,211,238,0.06)',
                    color: '#22D3EE', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 600, outline: 'none',
                    appearance: 'none', cursor: 'pointer',
                  }}
                >
                  {classOptions.map(c => (
                    <option key={c.value} value={c.value} style={{ background: '#0F172A', color: '#fff' }}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* SEARCH BTN */}
        <button className="sf-search-btn" onClick={handleSearch}>
          <Search size={16} strokeWidth={2.5} />
          Cari Tiket
        </button>
      </div>
    </motion.div>
  )
}
