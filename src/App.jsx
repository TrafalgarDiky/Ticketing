import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ResultsPage from './pages/ResultsPage'
import BookingPage from './pages/BookingPage'
import SuccessPage from './pages/SuccessPage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  )
}
