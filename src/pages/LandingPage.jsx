import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero-poster.jpg'
import sinImg   from '../assets/singapura.avif'
import bkkImg   from '../assets/bangkok.jpg'
import nrtImg   from '../assets/tokyo.jpg'
import dxbImg   from '../assets/dubai.jpg'
import icnImg   from '../assets/seoul.avif'
import sydImg   from '../assets/sydney.jpg'
import emiratesLogo    from '../assets/emiratesLogo.png'
import singaporeAiLogo from '../assets/singaporeAirlinesLogo.png'
import etihadLogo      from '../assets/eithadAirwaysLogo.png'
import qatarLogo       from '../assets/qatarAirwaysLogo.jpg'
import garudaLogo      from '../assets/garudaLogo.png'
import malaysiaLogo    from '../assets/malaysiaAirlinesLogo.png'

/* ── design tokens ── */
const accent     = '#118a90'
const accentDeep = '#0d6b70'
const accentSoft = '#e3f5f5'
const ink        = '#13242e'
const inkSoft    = '#4c5d68'
const line       = '#dde7eb'
const paper      = '#ffffff'
const mist       = '#eef3f8'
const navy       = '#0c1f2b'
const fontDisplay = "'Bricolage Grotesque','Plus Jakarta Sans',sans-serif"
const fontBody    = "'Plus Jakarta Sans',system-ui,sans-serif"
const maxW        = { maxWidth: 1240, margin: '0 auto', padding: '0 28px' }

/* ── Airlines data ── */
const AIRLINES = {
  SQ:{ name:'Singapore Airlines', color:'#1c3f94' },
  EK:{ name:'Emirates',           color:'#d71921' },
  QR:{ name:'Qatar Airways',      color:'#5c0632' },
  CX:{ name:'Cathay Pacific',     color:'#00665e' },
  TK:{ name:'Turkish Airlines',   color:'#c70a0c' },
  JL:{ name:'Japan Airlines',     color:'#b21e35' },
}
const FLIGHTS = [
  { code:'SQ', no:'SQ 957', dep:'06:20', arr:'09:10', dur:'2j 50m', durMin:170, stops:'Langsung',  price:1850000 },
  { code:'EK', no:'EK 357', dep:'08:45', arr:'13:20', dur:'4j 35m', durMin:275, stops:'1 transit', price:1620000 },
  { code:'CX', no:'CX 718', dep:'10:30', arr:'13:25', dur:'2j 55m', durMin:175, stops:'Langsung',  price:2090000 },
  { code:'TK', no:'TK 67',  dep:'13:15', arr:'18:40', dur:'5j 25m', durMin:325, stops:'1 transit', price:1490000 },
  { code:'JL', no:'JL 726', dep:'16:05', arr:'19:05', dur:'3j 00m', durMin:180, stops:'Langsung',  price:2250000 },
  { code:'QR', no:'QR 955', dep:'19:40', arr:'23:30', dur:'3j 50m', durMin:230, stops:'1 transit', price:1750000 },
]

/* ── Destination carousel data ── */
const DESTS = [
  { code:'SIN', city:'Singapura', sub:'Singapura · 1j 50m',    price:'Rp 1,2jt', tag:'Hemat 25%', img:sinImg, desc:'Kota taman futuristik — Marina Bay, Gardens by the Bay, dan surga kuliner hawker yang tak pernah tidur.' },
  { code:'BKK', city:'Bangkok',   sub:'Thailand · 3j 25m',     price:'Rp 2,1jt', tag:null,        img:bkkImg, desc:'Energi siang-malam: kuil emas, pasar terapung, dan street food legendaris di setiap sudut kota.' },
  { code:'NRT', city:'Tokyo',     sub:'Jepang · 7j 30m',       price:'Rp 6,5jt', tag:'Trending',  img:nrtImg, desc:'Pertemuan tradisi dan masa depan — kuil yang tenang, distrik neon Shibuya, dan musim sakura.' },
  { code:'DXB', city:'Dubai',     sub:'UEA · 8j 10m',          price:'Rp 8,9jt', tag:null,        img:dxbImg, desc:'Gurun bertemu kemewahan: Burj Khalifa, mal raksasa, dan safari pasir keemasan saat senja.' },
  { code:'ICN', city:'Seoul',     sub:'Korea Selatan · 7j 05m', price:'Rp 5,8jt', tag:null,       img:icnImg, desc:'K-culture, istana bersejarah, kafe estetik, dan belanja larut malam di Myeongdong.' },
  { code:'SYD', city:'Sydney',    sub:'Australia · 7j 20m',    price:'Rp 7,2jt', tag:null,        img:sydImg, desc:'Opera House ikonik, pantai Bondi, dan pelabuhan biru yang memukau sepanjang tahun.' },
]

const AIRPORTS = [
  { code:'CGK', city:'Jakarta',      name:'Soekarno-Hatta',          country:'Indonesia' },
  { code:'DPS', city:'Bali',         name:'Ngurah Rai',              country:'Indonesia' },
  { code:'SUB', city:'Surabaya',     name:'Juanda',                  country:'Indonesia' },
  { code:'KNO', city:'Medan',        name:'Kualanamu',               country:'Indonesia' },
  { code:'UPG', city:'Makassar',     name:'Sultan Hasanuddin',       country:'Indonesia' },
  { code:'YOG', city:'Yogyakarta',   name:'Yogyakarta Internasional',country:'Indonesia' },
  { code:'BPN', city:'Balikpapan',   name:'Sultan Aji M. Sulaiman',  country:'Indonesia' },
  { code:'LOP', city:'Lombok',       name:'Zainuddin Abdul Madjid',  country:'Indonesia' },
  { code:'SIN', city:'Singapura',    name:'Changi',                  country:'Singapura' },
  { code:'BKK', city:'Bangkok',      name:'Suvarnabhumi',            country:'Thailand' },
  { code:'NRT', city:'Tokyo',        name:'Narita',                  country:'Jepang' },
  { code:'DXB', city:'Dubai',        name:'Dubai Internasional',     country:'UEA' },
  { code:'ICN', city:'Seoul',        name:'Incheon',                 country:'Korea Selatan' },
  { code:'SYD', city:'Sydney',       name:'Kingsford Smith',         country:'Australia' },
  { code:'KUL', city:'Kuala Lumpur', name:'KLIA',                    country:'Malaysia' },
  { code:'HKG', city:'Hong Kong',    name:'Chek Lap Kok',            country:'Hong Kong' },
]

const AIRLINE_MARQUEE = [
  ['SQ','Singapore Airlines','#1c3f94'],['EK','Emirates','#d71921'],['QR','Qatar Airways','#5c0632'],
  ['CX','Cathay Pacific','#016b6f'],['TK','Turkish','#c70a0c'],['JL','Japan Airlines','#b21e35'],
  ['GA','Garuda Indonesia','#1b75bb'],['NH','ANA','#13448f'],['KE','Korean Air','#1a3a7a'],
  ['TG','Thai Airways','#5b2a86'],['MH','Malaysia Airlines','#c8102e'],['VN','Vietnam Airlines','#1a6b3c'],
  ['CI','China Airlines','#cf0a2c'],['BR','EVA Air','#1a6b4f'],['PR','Philippine Airlines','#00529b'],
  ['EY','Etihad','#bd8b13'],['SV','Saudia','#0a8a52'],['QF','Qantas','#c20000'],
  ['BA','British Airways','#2e5c99'],['LH','Lufthansa','#0a1f5c'],['KL','KLM','#0a7ec2'],
  ['AF','Air France','#13284f'],['SU','Aeroflot','#1b4ea0'],['AY','Finnair','#0b1f8f'],
]

function rp(n) { return 'Rp ' + n.toLocaleString('id-ID') }


/* ── Brand logo mark ── */
function BrandMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M3 17.5 29 4 18.5 29l-3.3-9.4a1 1 0 0 0-.6-.6L3 17.5Z" fill={accent} />
    </svg>
  )
}

function useHover() {
  const [hovered, setHovered] = useState(false)
  return [hovered, { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }]
}

/* ── Feature card ── */
function FeatCard({ icon, title, desc }) {
  const [hov, hovProps] = useHover()
  return (
    <div style={{ background: paper, border: hov ? '1px solid transparent' : `1px solid ${line}`, borderRadius: 18, padding: '30px 26px', transition: '.25s', transform: hov ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hov ? '0 22px 44px -30px rgba(12,31,43,.5)' : 'none' }} {...hovProps}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: accentSoft, color: accentDeep, display: 'grid', placeItems: 'center', marginBottom: 20 }}>{icon}</div>
      <h3 style={{ fontFamily: fontDisplay, fontSize: 19, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em', color: ink }}>{title}</h3>
      <p style={{ color: inkSoft, fontSize: 14.5, margin: 0, lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}

/* ── Swap button ── */
function SwapBtn({ onClick }) {
  const [hov, hovProps] = useHover()
  return (
    <button type="button" onClick={onClick} title="Tukar asal dan tujuan" aria-label="Tukar asal dan tujuan"
      style={{ position: 'absolute', right: -13, top: '50%', transform: hov ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)', zIndex: 4, width: 34, height: 34, borderRadius: '50%', background: hov ? accent : paper, border: hov ? `1px solid ${accent}` : `1px solid ${line}`, display: 'grid', placeItems: 'center', cursor: 'pointer', color: hov ? paper : accent, boxShadow: '0 4px 12px -6px rgba(12,31,43,.5)', transition: 'all .25s', padding: 0 }}
      {...hovProps}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4 3 8l4 4"/><path d="M3 8h13"/><path d="m17 20 4-4-4-4"/><path d="M21 16H8"/>
      </svg>
    </button>
  )
}


/* ── Airport autocomplete ── */
function AirportSelect({ label, value, onChange, hasSwap, onSwap }) {
  const [open, setOpen] = useState(false)
  const [q, setQ]       = useState(value)
  const ref             = useRef(null)

  useEffect(() => { setQ(value) }, [value])

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const filtered = AIRPORTS.filter(a =>
    [a.city, a.code, a.name, a.country].some(s => s.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 6)

  const pick = (a) => { const v = `${a.city} (${a.code})`; setQ(v); onChange(v); setOpen(false) }

  return (
    <div ref={ref} style={{ position: 'relative', background: mist, border: '1px solid transparent', borderRadius: 14, padding: '12px 16px', transition: '.2s' }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: inkSoft, marginBottom: 3 }}>{label}</span>
      <input type="text" value={q}
        onChange={e => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: fontBody, fontSize: 16, fontWeight: 600, color: ink, width: '100%', padding: 0 }}
      />
      {hasSwap && <SwapBtn onClick={onSwap} />}
      {open && filtered.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 50, background: paper, borderRadius: 14, border: `1px solid ${line}`, boxShadow: '0 20px 50px -20px rgba(12,31,43,.35)', overflow: 'hidden' }}>
          {filtered.map(a => (
            <div key={a.code} onMouseDown={() => pick(a)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', cursor: 'pointer', transition: '.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = mist}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{a.city}</div>
                <div style={{ fontSize: 12, color: inkSoft, marginTop: 2 }}>{a.name} · {a.country}</div>
              </div>
              <span style={{ fontWeight: 800, fontSize: 14, color: accentDeep, letterSpacing: '.05em' }}>{a.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Date field ── */
function DateField({ label, value, onChange }) {
  return (
    <div style={{ background: mist, border: '1px solid transparent', borderRadius: 14, padding: '12px 16px', transition: '.2s' }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: inkSoft, marginBottom: 3 }}>{label}</span>
      <input type="date" value={value} onChange={e => onChange(e.target.value)}
        style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: fontBody, fontSize: 16, fontWeight: 600, color: ink, width: '100%', padding: 0, cursor: 'pointer' }}
      />
    </div>
  )
}

/* ── Passenger selector ── */
function PaxSelect({ onChange }) {
  const [open, setOpen]     = useState(false)
  const [adults, setAdults] = useState(1)
  const [kids, setKids]     = useState(0)
  const ref                 = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const label = (a, k) => [a > 0 ? `${a} Dewasa` : null, k > 0 ? `${k} Anak` : null].filter(Boolean).join(', ') || '1 Dewasa'
  const upd   = (a, k) => onChange(label(a, k))
  const chgA  = (n) => { setAdults(n); upd(n, kids) }
  const chgK  = (n) => { setKids(n);   upd(adults, n) }

  const btnBase = { width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 300, lineHeight: 1, transition: '.15s', fontFamily: 'inherit', border: 'none' }

  return (
    <div ref={ref} style={{ position: 'relative', background: mist, border: '1px solid transparent', borderRadius: 14, padding: '12px 16px', cursor: 'pointer', transition: '.2s', userSelect: 'none' }} onClick={() => setOpen(o => !o)}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: inkSoft, marginBottom: 3 }}>Penumpang</span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 16, fontWeight: 600, color: ink }}>
        {label(adults, kids)}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={inkSoft} strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '.2s', flexShrink: 0 }}><path d="m6 9 6 6 6-6"/></svg>
      </div>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50, background: paper, border: `1px solid ${line}`, borderRadius: 14, padding: '8px 18px 14px', boxShadow: '0 20px 50px -20px rgba(12,31,43,.35)', minWidth: 240 }}>
          {[
            { lbl:'Dewasa', sub:'≥ 12 tahun', val:adults, set:chgA, min:1 },
            { lbl:'Anak',   sub:'2–11 tahun', val:kids,   set:chgK, min:0 },
          ].map(({ lbl, sub, val, set, min }, i, arr) => (
            <div key={lbl} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < arr.length - 1 ? `1px solid ${line}` : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{lbl}</div>
                <div style={{ fontSize: 12, color: inkSoft, marginTop: 2 }}>{sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button type="button" disabled={val <= min} onClick={() => set(val - 1)}
                  style={{ ...btnBase, border: `1.5px solid ${val <= min ? line : accentDeep}`, background: 'transparent', color: val <= min ? inkSoft : accentDeep, opacity: val <= min ? 0.4 : 1 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 15, color: ink, minWidth: 16, textAlign: 'center' }}>{val}</span>
                <button type="button" disabled={val >= 9} onClick={() => set(val + 1)}
                  style={{ ...btnBase, border: `1.5px solid ${accent}`, background: accentSoft, color: accentDeep }}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Destination Bento Grid ── */
function DestBentoGrid({ onSearchTo }) {
  const [hovIdx, setHovIdx] = useState(null)

  const layouts = [
    { gridColumn: '1', gridRow: '3' },
    { gridColumn: '2', gridRow: '3' },
    { gridColumn: '1 / 3', gridRow: '1 / 3' },
    { gridColumn: '3', gridRow: '1' },
    { gridColumn: '3', gridRow: '2' },
    { gridColumn: '3', gridRow: '3' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '260px 260px 200px',
      gap: 14,
    }}>
      {DESTS.map((d, i) => {
        const isHov     = hovIdx === i
        const isFeature = i === 2
        return (
          <div
            key={d.code}
            style={{
              ...layouts[i],
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              cursor: 'pointer',
              background: mist,
              boxShadow: isHov ? '0 28px 56px -20px rgba(12,31,43,.55)' : '0 6px 24px -10px rgba(12,31,43,.18)',
              transition: 'box-shadow .35s ease, transform .35s ease',
              transform: isHov ? 'translateY(-4px)' : 'none',
            }}
            onClick={() => onSearchTo(d.city, d.code)}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
          >
            <img src={d.img} alt={d.city} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', pointerEvents: 'none',
              transform: isHov ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform .7s cubic-bezier(.22,.61,.36,1)',
            }} />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: isHov
                ? 'linear-gradient(180deg,rgba(12,31,43,0) 0%,rgba(7,18,26,.45) 55%,rgba(7,18,26,.75) 100%)'
                : 'linear-gradient(180deg,rgba(12,31,43,0) 28%,rgba(12,31,43,.65) 60%,rgba(7,18,26,.92) 100%)',
              transition: 'background .5s ease',
            }} />
            {d.tag && (
              <span style={{
                position: 'absolute', top: 14, left: 14, zIndex: 3,
                background: 'rgba(255,255,255,.92)', color: accentDeep,
                fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 999,
              }}>{d.tag}</span>
            )}
            <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, zIndex: 3, color: '#fff' }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.02em', fontSize: isFeature ? 30 : 20 }}>{d.city}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: '1 1 auto' }}>{d.sub}</span>
                <span style={{ textAlign: 'right', lineHeight: 1.15, flex: '0 0 auto' }}>
                  <small style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,.75)', fontWeight: 500, whiteSpace: 'nowrap' }}>mulai dari</small>
                  <b style={{ fontSize: isFeature ? 20 : 16, fontWeight: 700, whiteSpace: 'nowrap' }}>{d.price}</b>
                </span>
              </div>
              {isFeature && (
                <div style={{
                  marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,.88)',
                  maxHeight: isHov ? 120 : 0, opacity: isHov ? 1 : 0,
                  overflow: 'hidden', transition: 'max-height .5s ease, opacity .4s ease',
                }}>
                  {d.desc}
                  <span style={{ display: 'block', marginTop: 10, fontWeight: 700, fontSize: 13, color: '#bdeef0' }}>Cari penerbangan →</span>
                </div>
              )}
              {!isFeature && isHov && (
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: '#bdeef0', letterSpacing: '.01em' }}>
                  Cari penerbangan →
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const AIRLINE_LOGO_MAP = {
  EK: { logo: emiratesLogo,    bg: '#d71921' },
  SQ: { logo: singaporeAiLogo, bg: '#ffffff' },
  EY: { logo: etihadLogo,      bg: '#bd8b13' },
  QR: { logo: qatarLogo,       bg: '#5c0632' },
  GA: { logo: garudaLogo,      bg: '#ffffff' },
  MH: { logo: malaysiaLogo,    bg: '#ffffff' },
}

/* ── Footer Marquee ── */
function FooterMarquee() {
  const ROWS = 4
  const durations = [44, 38, 50, 41]

  return (
    <div style={{ padding: '6px 0 36px', marginBottom: 48, borderBottom: '1px solid rgba(255,255,255,.1)', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)' }}>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.5)', fontSize: 12.5, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', margin: '0 0 28px' }}>Terhubung dengan maskapai mitra global</p>
      {Array.from({ length: ROWS }, (_, r) => {
        const per = Math.ceil(AIRLINE_MARQUEE.length / ROWS)
        let slice = AIRLINE_MARQUEE.slice(r * per, r * per + per)
        if (slice.length < 4) slice = slice.concat(AIRLINE_MARQUEE.slice(0, 4 - slice.length))
        const chips = [...slice, ...slice, ...slice, ...slice].map((a, j) => {
          const hasLogo = AIRLINE_LOGO_MAP[a[0]]
          return (
            <div key={j} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 11, padding: '11px 19px', border: '1px solid rgba(255,255,255,.12)', borderRadius: 13, background: 'rgba(255,255,255,.04)' }}>
              {hasLogo ? (
                <div style={{ width: 44, height: 28, borderRadius: 6, background: AIRLINE_LOGO_MAP[a[0]].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 5px', flex: '0 0 auto', overflow: 'hidden' }}>
                  <img src={AIRLINE_LOGO_MAP[a[0]].logo} alt={a[1]} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
              ) : (
                <span style={{ width: 30, height: 30, borderRadius: 8, background: a[2], display: 'grid', placeItems: 'center', fontFamily: fontDisplay, fontWeight: 800, fontSize: 12.5, color: '#fff', letterSpacing: '.02em', flex: '0 0 auto' }}>{a[0]}</span>
              )}
              <span style={{ fontWeight: 600, fontSize: 14.5, color: 'rgba(255,255,255,.8)', whiteSpace: 'nowrap' }}>{a[1]}</span>
            </div>
          )
        })
        const animName = r % 2 === 0 ? 'mqRight' : 'mqLeft'
        return (
          <div key={r} style={{ display: 'flex', gap: 15, width: 'max-content', marginBottom: r < ROWS - 1 ? 15 : 0, animation: `${animName} ${durations[r % durations.length]}s linear infinite` }}>
            {chips}
          </div>
        )
      })}
    </div>
  )
}




/* ── Scroll reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    els.forEach(el => io.observe(el))
    requestAnimationFrame(() => {
      const vh = window.innerHeight
      els.forEach(el => { if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in') })
    })
    return () => io.disconnect()
  }, [])
}

/* ════════════════════════════════════ */
/*              MAIN PAGE              */
/* ════════════════════════════════════ */
export default function LandingPage() {
  const navigate                = useNavigate()
  const [navSolid, setNavSolid] = useState(false)
  const [tripType, setTripType] = useState('rt')
  const [from, setFrom]         = useState('Jakarta (CGK)')
  const [to, setTo]             = useState('Singapura (SIN)')
  const [depart, setDepart]     = useState('2026-06-14')
  const [returnDate, setReturn] = useState('2026-06-21')
  const [pax, setPax]           = useState('1 Dewasa')
  const [searching, setSearching] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSwap = () => { const tmp = from; setFrom(to); setTo(tmp) }

  function codeOf(v) { const m = (v||'').match(/\(([A-Za-z]{3})\)/); return m ? m[1].toUpperCase() : (v||'').slice(0,3).toUpperCase() }

  const handleSearch = () => {
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      const paxNum = parseInt((pax || '1').match(/\d+/)?.[0] || 1)
      navigate(`/results?from=${codeOf(from)}&to=${codeOf(to)}&date=${depart}&pax=${paxNum}&class=ekonomi`)
    }, 700)
  }

  const handleSearchTo = (city, code) => {
    navigate(`/results?from=${codeOf(from)}&to=${code}`)
  }


  return (
    <div style={{ fontFamily: fontBody, color: ink, background: paper, WebkitFontSmoothing: 'antialiased', lineHeight: 1.55, margin: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        a{text-decoration:none;color:inherit;}
        img{display:block;max-width:100%;}
        @keyframes heroUp{to{opacity:1;transform:none;}}
        @keyframes scrIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
        @keyframes pop{from{transform:scale(.6);opacity:0;}to{transform:none;opacity:1;}}
        @keyframes mqLeft{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes mqRight{from{transform:translateX(-50%);}to{transform:translateX(0);}}
        @media(prefers-reduced-motion:no-preference){
          .hero-enter{opacity:0;transform:translateY(28px);animation:heroUp .95s cubic-bezier(.22,.61,.36,1) forwards;}
          .hero-enter-1{animation-delay:.15s;}
          .hero-enter-2{animation-delay:.32s;}
          .hero-enter-3{animation-delay:.48s;}
          .hero-enter-4{animation-delay:.66s;}
          .reveal{opacity:0;transform:translateY(38px);transition:opacity .75s cubic-bezier(.22,.61,.36,1),transform .75s cubic-bezier(.22,.61,.36,1);}
          .reveal.in{opacity:1;transform:none;}
        }
        @media(max-width:1080px){
          .feat-grid{grid-template-columns:repeat(2,1fr)!important;}
          .exp-in{grid-template-columns:1fr!important;gap:36px!important;}
          .search-row{grid-template-columns:1fr 1fr!important;}
          .search-cta{grid-column:1/-1!important;}
        }
        input[type=date]{color-scheme:light;}
        input[type=date]::-webkit-calendar-picker-indicator{opacity:.45;cursor:pointer;}
        @media(max-width:760px){
          .nav-links{display:none!important;}
          .nav-login{display:none!important;}
          .search-row{grid-template-columns:1fr!important;}
          .field-swap-hide{display:none!important;}
          .foot-grid{grid-template-columns:1fr 1fr!important;gap:30px!important;}
          .foot-brand-cell{grid-column:1/-1!important;}
        }
      `}</style>

      {/* ════ NAV ════ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, transition: 'background .35s ease, box-shadow .35s ease, border-color .35s', borderBottom: navSolid ? `1px solid ${line}` : '1px solid transparent', background: navSolid ? 'rgba(255,255,255,.92)' : 'transparent', backdropFilter: navSolid ? 'blur(14px)' : 'none', boxShadow: navSolid ? '0 8px 30px -22px rgba(12,31,43,.5)' : 'none' }}>
        <div style={{ ...maxW, display: 'flex', alignItems: 'center', gap: 34, height: 74 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, fontFamily: fontDisplay, fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', color: navSolid ? ink : '#fff', transition: 'color .35s', textDecoration: 'none' }}>
            <BrandMark />Syududu Air
          </a>
          <div className="nav-links" style={{ display: 'flex', gap: 30, marginLeft: 8 }}>
            {['Destinasi','Keunggulan','Armada','Bantuan'].map((lbl, i) => (
              <a key={lbl} href={['#destinasi','#keunggulan','#armada','#bantuan'][i]}
                style={{ color: navSolid ? inkSoft : 'rgba(255,255,255,.85)', fontWeight: 500, fontSize: 15, transition: 'color .25s', padding: '4px 2px' }}>{lbl}</a>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
            <a className="nav-login" href="#" style={{ color: navSolid ? ink : '#fff', fontWeight: 600, fontSize: 15, opacity: 0.9 }}>Masuk</a>
            <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: fontBody, fontWeight: 600, fontSize: 15, border: navSolid ? `1px solid ${line}` : '1px solid rgba(255,255,255,.28)', borderRadius: 999, padding: '12px 22px', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap', background: navSolid ? mist : 'rgba(255,255,255,.14)', color: navSolid ? ink : '#fff', backdropFilter: navSolid ? 'none' : 'blur(6px)' }}>Pesan Tiket</a>
          </div>
        </div>
      </nav>

      {/* ════ HERO ════ */}
      <header id="top" style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 46 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={heroImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <video autoPlay muted loop playsInline preload="auto" poster={heroImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg,rgba(7,22,30,.55) 0%,rgba(7,22,30,0) 26%,rgba(7,22,30,0) 50%,rgba(7,22,30,.38) 100%),linear-gradient(90deg,rgba(7,22,30,.4) 0%,rgba(7,22,30,0) 55%)' }} />
        <div style={{ ...maxW, position: 'relative', zIndex: 2 }}>
          <p className="hero-enter hero-enter-1" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bfeef0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 30, height: 2, background: accent, display: 'inline-block' }} />Maskapai internasional pilihanmu
          </p>
          <h1 className="hero-enter hero-enter-2" style={{ fontFamily: fontDisplay, color: '#fff', fontSize: 'clamp(38px,5.4vw,72px)', fontWeight: 800, lineHeight: 1.06, maxWidth: '19ch', textShadow: '0 2px 30px rgba(0,0,0,.25)', margin: 0, letterSpacing: '-0.02em' }}>
            Langit terbuka untuk setiap perjalanan.
          </h1>
          <p className="hero-enter hero-enter-3" style={{ color: 'rgba(255,255,255,.92)', fontSize: 'clamp(16px,1.5vw,20px)', maxWidth: '52ch', marginTop: 28, lineHeight: 1.6 }}>
            Jelajahi destinasi favorit di seluruh dunia dengan kenyamanan kelas dunia, jadwal yang tepat, dan harga yang jujur.
          </p>
          {/* search */}
          <form id="search" className="hero-enter hero-enter-4" onSubmit={e => e.preventDefault()} style={{ position: 'relative', zIndex: 3, marginTop: 40, background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(8px)', borderRadius: 22, padding: 14, boxShadow: '0 30px 70px -30px rgba(7,22,30,.6)', border: '1px solid rgba(255,255,255,.6)' }}>
            <div style={{ display: 'flex', gap: 6, padding: '6px 6px 12px' }}>
              {[{id:'rt',lbl:'Pulang-Pergi'},{id:'ow',lbl:'Sekali Jalan'}].map(t => (
                <button key={t.id} type="button" onClick={() => setTripType(t.id)}
                  style={{ fontWeight: 600, fontSize: 14, color: tripType === t.id ? accentDeep : inkSoft, background: tripType === t.id ? accentSoft : 'transparent', border: 'none', padding: '9px 16px', borderRadius: 999, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: '.2s' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', border: `2px solid ${tripType === t.id ? accent : inkSoft}`, background: tripType === t.id ? accent : 'transparent', display: 'inline-block' }} />{t.lbl}
                </button>
              ))}
            </div>
            <div className="search-row" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.3fr 1fr 1fr 1fr auto', gap: 8, alignItems: 'stretch' }}>
              <AirportSelect label="Dari" value={from} onChange={setFrom} hasSwap onSwap={handleSwap} />
              <div className="field-swap-hide" style={{ display: 'contents' }}>
                <AirportSelect label="Ke" value={to} onChange={setTo} />
              </div>
              <DateField label="Berangkat" value={depart} onChange={setDepart} />
              {tripType === 'rt' ? <DateField label="Kembali" value={returnDate} onChange={setReturn} /> : <div />}
              <PaxSelect onChange={setPax} />
              <div className="search-cta" style={{ display: 'flex', alignItems: 'stretch' }}>
                <button type="button" onClick={handleSearch} style={{ width: '100%', borderRadius: 14, paddingLeft: 26, paddingRight: 26, fontSize: 15, fontFamily: fontBody, fontWeight: 600, border: 'none', background: accent, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 22px -10px rgba(17,138,144,.8)', transition: '.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {searching ? 'Mencari…' : 'Cari Penerbangan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>

      {/* ════ TRUST STRIP ════ */}
      <section style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`, background: paper }}>
        <div style={{ ...maxW, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 30, padding: '26px 28px' }}>
          {[{num:'80+',lbl:'kota terhubung'},{num:'98%',lbl:'tepat waktu'},{num:'4.8',lbl:'rating penumpang'},{num:'12 jt',lbl:'penumpang / tahun'},{num:'24/7',lbl:'layanan pelanggan'}].map(({ num, lbl }) => (
            <div key={lbl} className="reveal" style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 30, color: ink, letterSpacing: '-0.02em' }}>{num}</span>
              <span style={{ fontSize: 14, color: inkSoft, fontWeight: 500 }}>{lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════ DESTINATIONS ════ */}
      <section id="destinasi" style={{ padding: '104px 0' }}>
        <div style={maxW}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, marginBottom: 46, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>Destinasi populer</p>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(30px,3.6vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, maxWidth: '18ch', color: ink }}>Dunia, satu penerbangan saja.</h2>
            </div>
            <p style={{ color: inkSoft, maxWidth: '42ch', fontSize: 16, margin: 0 }}>Dari gemerlap Tokyo hingga pesisir Sydney — rute internasional favorit dengan harga terbaik minggu ini.</p>
          </div>
          <DestBentoGrid onSearchTo={handleSearchTo} />
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section style={{ padding: '104px 0', background: mist }} id="keunggulan">
        <div style={maxW}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, marginBottom: 46, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>Kenapa Syududu Air</p>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(30px,3.6vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, maxWidth: '18ch', color: ink }}>Terbang yang terasa ringan.</h2>
            </div>
            <p style={{ color: inkSoft, maxWidth: '42ch', fontSize: 16, margin: 0 }}>Setiap detail kami rancang supaya perjalananmu mulus dari pesan tiket sampai mendarat.</p>
          </div>
          <div className="feat-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            <FeatCard icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>} title="Tepat waktu" desc="98% penerbangan berangkat sesuai jadwal. Waktumu kami hargai sepenuhnya." />
            <FeatCard icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/><path d="M9 12h6"/></svg>} title="Bagasi lega" desc="Kuota bagasi 20kg gratis di setiap tiket, tanpa biaya tersembunyi." />
            <FeatCard icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>} title="Hiburan kabin" desc="Ratusan film, musik, dan Wi-Fi di langit pada armada terbaru kami." />
            <FeatCard icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>} title="Jaringan luas" desc="80+ kota di seluruh dunia terhubung dalam satu kartu." />
          </div>
        </div>
      </section>

      {/* ════ EXPERIENCE ════ */}
      <section style={{ padding: '104px 0', background: navy, color: '#fff', overflow: 'hidden' }} id="armada">
        <div className="exp-in reveal" style={{ ...maxW, display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 40px 80px -40px rgba(0,0,0,.7)' }}>
            <img src={heroImg} alt="Pesawat Syududu Air di atas awan" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7fd6d9', marginBottom: 16 }}>Armada &amp; pengalaman</p>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(28px,3.4vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', maxWidth: '14ch', margin: 0 }}>Kabin senyap, langit lapang.</h2>
            <p style={{ color: 'rgba(255,255,255,.74)', fontSize: 16.5, maxWidth: '46ch', margin: '20px 0 30px', lineHeight: 1.65 }}>Armada generasi baru kami lebih hening, lebih hemat bahan bakar, dan dirancang untuk ruang kaki yang lega di setiap kursi.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 34px', display: 'grid', gap: 14 }}>
              {['Kursi ergonomis dengan sandaran lebih lebar','Emisi 20% lebih rendah per penerbangan','Pencahayaan kabin yang menyesuaikan ritme perjalanan'].map(item => (
                <li key={item} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', color: 'rgba(255,255,255,.9)', fontSize: 15.5 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="m5 12 5 5 9-11"/></svg>{item}
                </li>
              ))}
            </ul>
            <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '16px 30px', background: accent, color: '#fff', border: 'none', borderRadius: 999, fontFamily: fontBody, fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 8px 22px -10px rgba(17,138,144,.8)', transition: '.2s' }}>Jelajahi armada</a>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section id="bantuan" style={{ padding: '96px 0', textAlign: 'center', background: `radial-gradient(120% 140% at 50% 0%,${accentSoft} 0%,#fff 60%)` }}>
        <div style={maxW}>
          <h2 className="reveal" style={{ fontFamily: fontDisplay, fontSize: 'clamp(30px,4vw,54px)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: '18ch', margin: '0 auto 18px', color: ink }}>Siap mengudara bersama Syududu Air?</h2>
          <p className="reveal" style={{ color: inkSoft, fontSize: 17, maxWidth: '48ch', margin: '0 auto 32px' }}>Unduh aplikasi untuk check-in 1 menit, boarding pass digital, dan penawaran rute eksklusif.</p>
          <div className="reveal" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '16px 30px', background: ink, color: '#fff', border: 'none', borderRadius: 999, fontFamily: fontBody, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Unduh aplikasi</button>
            <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '16px 30px', background: 'transparent', color: ink, border: `1.5px solid ${line}`, borderRadius: 999, fontFamily: fontBody, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Pesan sekarang</a>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background: navy, color: 'rgba(255,255,255,.7)', padding: '72px 0 30px' }}>
        <FooterMarquee />
        <div style={maxW}>
          <div className="foot-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, paddingBottom: 50, borderBottom: '1px solid rgba(255,255,255,.12)' }}>
            <div className="foot-brand-cell">
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontFamily: fontDisplay, fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 18 }}><BrandMark />Syududu Air</div>
              <p style={{ fontSize: 14.5, maxWidth: '34ch', lineHeight: 1.6, margin: '0 0 22px', color: 'rgba(255,255,255,.7)' }}>Menghubungkan kamu ke seluruh dunia. Terbang lebih dekat ke orang dan tempat yang kamu cintai.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { lbl:'Instagram', icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
                  { lbl:'X', icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 3h2.9l-6.4 7.3L22 21h-5.8l-4.5-5.9L6.5 21H3.6l6.8-7.8L2.5 3h5.9l4.1 5.4L18.2 3Z"/></svg> },
                  { lbl:'YouTube', icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg> },
                ].map(({ lbl, icon }) => (
                  <a key={lbl} href="#" aria-label={lbl} style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,.18)', display: 'grid', placeItems: 'center', color: '#fff', transition: '.2s' }}>{icon}</a>
                ))}
              </div>
            </div>
            {[
              { head:'Jelajahi', links:[['Destinasi','#destinasi'],['Cari tiket','#search'],['Promo & diskon','#'],['Kartu Syududu','#']] },
              { head:'Perusahaan', links:[['Tentang kami','#'],['Armada','#armada'],['Karier','#'],['Keberlanjutan','#']] },
              { head:'Bantuan', links:[['Pusat bantuan','#'],['Status penerbangan','#'],['Refund & ubah jadwal','#'],['Hubungi kami','#']] },
            ].map(col => (
              <div key={col.head}>
                <h4 style={{ color: '#fff', fontFamily: fontBody, fontSize: 14, fontWeight: 700, letterSpacing: '.04em', margin: '0 0 16px' }}>{col.head}</h4>
                {col.links.map(([lbl, href]) => (
                  <a key={lbl} href={href} style={{ display: 'block', fontSize: 14.5, color: 'rgba(255,255,255,.66)', marginBottom: 11, transition: '.2s' }}>{lbl}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', flexWrap: 'wrap', gap: 8, paddingTop: 24, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
            <span>© 2026 DikyFirmansyah. Syududu Air</span>
            <span>Syarat &amp; Ketentuan · Kebijakan Privasi</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
