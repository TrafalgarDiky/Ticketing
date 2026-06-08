import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FlightCard from './FlightCard'

export default function FlightCarousel({ flights, activeIndex, onSelect, theme }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <div className="fc-wrap">
      {/* Left arrow */}
      <button
        className="fc-arrow fc-arrow-left"
        onClick={() => scroll(-1)}
        aria-label="Geser kiri"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Scrollable track */}
      <div ref={trackRef} className="fc-track">
        {flights.map((flight, i) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            isActive={i === activeIndex}
            theme={theme}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        className="fc-arrow fc-arrow-right"
        onClick={() => scroll(1)}
        aria-label="Geser kanan"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
