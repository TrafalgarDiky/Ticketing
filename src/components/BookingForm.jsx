import { motion } from 'framer-motion'
import { User, Phone, Mail, CreditCard } from 'lucide-react'

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } },
})

function Section({ icon, title, children, delay = 0 }) {
  return (
    <motion.div className="bf-section" {...fadeUp(delay)}>
      <div className="bf-section-title">
        <span style={{ color: '#22D3EE' }}>{icon}</span>
        {title}
      </div>
      {children}
    </motion.div>
  )
}

export default function BookingForm({ formData, onChange }) {
  const set = (key) => (e) => onChange({ ...formData, [key]: e.target.value })

  return (
    <div>
      {/* Passenger Data */}
      <Section icon={<User size={18} />} title="Data Penumpang" delay={0}>
        <div className="bf-grid">
          <div className="bf-field full">
            <label className="bf-label">Nama Lengkap</label>
            <input
              className="bf-input"
              placeholder="Sesuai KTP / Paspor"
              value={formData.fullName || ''}
              onChange={set('fullName')}
            />
          </div>

          <div className="bf-field">
            <label className="bf-label">Jenis Kelamin</label>
            <select className="bf-input" value={formData.gender || ''} onChange={set('gender')} style={{ backgroundImage: 'none' }}>
              <option value="" style={{ background: '#0F172A' }}>Pilih jenis kelamin</option>
              <option value="L" style={{ background: '#0F172A' }}>Laki-laki</option>
              <option value="P" style={{ background: '#0F172A' }}>Perempuan</option>
            </select>
          </div>

          <div className="bf-field">
            <label className="bf-label">Kewarganegaraan</label>
            <select className="bf-input" value={formData.nationality || 'ID'} onChange={set('nationality')} style={{ backgroundImage: 'none' }}>
              <option value="ID" style={{ background: '#0F172A' }}>Indonesia</option>
              <option value="SG" style={{ background: '#0F172A' }}>Singapura</option>
              <option value="MY" style={{ background: '#0F172A' }}>Malaysia</option>
              <option value="AU" style={{ background: '#0F172A' }}>Australia</option>
              <option value="JP" style={{ background: '#0F172A' }}>Jepang</option>
              <option value="other" style={{ background: '#0F172A' }}>Lainnya</option>
            </select>
          </div>

          <div className="bf-field">
            <label className="bf-label">Tanggal Lahir</label>
            <input
              type="date"
              className="bf-input"
              value={formData.birthDate || ''}
              onChange={set('birthDate')}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <div className="bf-field">
            <label className="bf-label">Nomor Identitas (KTP/Paspor)</label>
            <input
              className="bf-input"
              placeholder="Nomor KTP atau Paspor"
              value={formData.idNumber || ''}
              onChange={set('idNumber')}
            />
          </div>
        </div>
      </Section>

      {/* Contact Info */}
      <Section icon={<Phone size={18} />} title="Informasi Kontak" delay={1}>
        <div className="bf-grid">
          <div className="bf-field full">
            <label className="bf-label">Alamat Email</label>
            <input
              type="email"
              className="bf-input"
              placeholder="contoh@email.com"
              value={formData.email || ''}
              onChange={set('email')}
            />
          </div>
          <div className="bf-field full">
            <label className="bf-label">Nomor Handphone</label>
            <input
              type="tel"
              className="bf-input"
              placeholder="+62 812 3456 7890"
              value={formData.phone || ''}
              onChange={set('phone')}
            />
          </div>
        </div>
      </Section>

      {/* Tambahan */}
      <Section icon={<CreditCard size={18} />} title="Layanan Tambahan" delay={2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { id: 'baggage', label: 'Bagasi Tambahan 10kg', price: '+Rp 150.000' },
            { id: 'meal', label: 'Pilih Makanan Premium', price: '+Rp 80.000' },
            { id: 'insurance', label: 'Asuransi Perjalanan', price: '+Rp 50.000' },
          ].map(({ id, label, price }) => (
            <label key={id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1.5px solid rgba(255,255,255,0.08)',
              borderRadius: 12, cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <input
                type="checkbox"
                id={id}
                checked={formData[id] || false}
                onChange={e => onChange({ ...formData, [id]: e.target.checked })}
                style={{ accentColor: '#22D3EE', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ flex: 1, fontSize: 14, color: '#CBD5E1', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#22D3EE', fontWeight: 700 }}>{price}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  )
}
