import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import StepProgress from '../components/StepProgress'
import BookingForm from '../components/BookingForm'
import SummaryCard from '../components/SummaryCard'

const STEPS = ['Penumpang', 'Kontak', 'Tambahan', 'Pembayaran']

export default function BookingPage() {
  const navigate  = useNavigate()
  const [flight] = useState(() => {
    const saved = localStorage.getItem('selectedFlight')
    if (!saved) return null
    try { return JSON.parse(saved) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', gender: '', nationality: 'ID',
    birthDate: '', idNumber: '',
    email: '', phone: '',
    baggage: false, meal: false, insurance: false,
  })

  useEffect(() => {
    if (!flight) navigate('/')
  }, [flight, navigate])

  const step = useMemo(() => {
    const { fullName, gender, birthDate } = formData
    return fullName && gender && birthDate ? 1 : 0
  }, [formData])

  const handleBook = () => {
    setLoading(true)
    localStorage.setItem('bookingData', JSON.stringify({ flight, formData, bookingId: `TRB-${Math.random().toString(36).substr(2,8).toUpperCase()}` }))
    setTimeout(() => {
      setLoading(false)
      navigate('/success')
    }, 1600)
  }

  if (!flight) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#CBD5E1' }}>Memuat...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #020617 0%, #0F172A 100%)' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        paddingTop: 90, paddingBottom: 32,
        paddingLeft: 24, paddingRight: 24,
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 28, textAlign: 'center' }}
          >
            Informasi Pemesan
          </motion.h1>

          <StepProgress steps={STEPS} currentStep={step} />
        </div>
      </div>

      {/* Body */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '32px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: 28, alignItems: 'start',
      }}
      className="booking-layout"
      >
        {/* Form */}
        <div>
          <BookingForm formData={formData} onChange={setFormData} />
        </div>

        {/* Summary */}
        <div>
          <SummaryCard flight={flight} formData={formData} onBook={handleBook} loading={loading} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
