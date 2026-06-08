import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function StepProgress({ steps, currentStep }) {
  return (
    <div className="sp-wrap">
      {steps.map((step, i) => {
        const done    = i < currentStep
        const active  = i === currentStep
        const future  = i > currentStep

        return (
          <div key={step} className="sp-step">
            <div className="sp-step-inner">
              <motion.div
                className="sp-circle"
                animate={{
                  background: done   ? '#34D399' : active ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.07)',
                  borderColor: done  ? '#34D399' : active ? '#22D3EE' : 'rgba(255,255,255,0.15)',
                  color: done        ? '#fff'    : active ? '#22D3EE'  : 'rgba(203,213,225,0.4)',
                  boxShadow: active ? '0 0 0 4px rgba(34,211,238,0.2)' : 'none',
                }}
                transition={{ duration: 0.35 }}
                style={{
                  border: '2px solid',
                  width: 32, height: 32,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </motion.div>
              <span style={{
                fontSize: 11, fontWeight: 600, marginTop: 6, whiteSpace: 'nowrap',
                color: active ? '#22D3EE' : done ? '#34D399' : 'rgba(203,213,225,0.4)',
              }}>
                {step}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <motion.div
                animate={{
                  background: done ? '#22D3EE' : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.4, delay: done ? 0.1 : 0 }}
                style={{
                  height: 2, width: 60, margin: '0 4px', marginBottom: 18,
                  borderRadius: 2, flexShrink: 0,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
