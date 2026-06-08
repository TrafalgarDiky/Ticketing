export const airports = [
  { code: 'CGK', city: 'Jakarta',      name: 'Soekarno-Hatta Intl',    country: 'Indonesia', tz: 'WIB'  },
  { code: 'DPS', city: 'Bali',         name: 'Ngurah Rai Intl',         country: 'Indonesia', tz: 'WITA' },
  { code: 'SUB', city: 'Surabaya',     name: 'Juanda Intl',             country: 'Indonesia', tz: 'WIB'  },
  { code: 'KNO', city: 'Medan',        name: 'Kualanamu Intl',          country: 'Indonesia', tz: 'WIB'  },
  { code: 'UPG', city: 'Makassar',     name: 'Sultan Hasanuddin Intl',  country: 'Indonesia', tz: 'WITA' },
  { code: 'BPN', city: 'Balikpapan',  name: 'Sultan Aji M. Sulaiman',  country: 'Indonesia', tz: 'WITA' },
  { code: 'MDC', city: 'Manado',       name: 'Sam Ratulangi Intl',      country: 'Indonesia', tz: 'WITA' },
  { code: 'SIN', city: 'Singapura',    name: 'Changi Airport',          country: 'Singapura', tz: 'SGT'  },
  { code: 'KUL', city: 'Kuala Lumpur',name: 'KLIA',                    country: 'Malaysia',  tz: 'MYT'  },
  { code: 'BKK', city: 'Bangkok',      name: 'Suvarnabhumi Airport',    country: 'Thailand',  tz: 'ICT'  },
  { code: 'NRT', city: 'Tokyo',        name: 'Narita Intl',             country: 'Jepang',    tz: 'JST'  },
  { code: 'SYD', city: 'Sydney',       name: 'Kingsford Smith Airport', country: 'Australia', tz: 'AEST' },
]

export const airlines = [
  { code: 'GA', name: 'Garuda Indonesia', abbr: 'GA', color: '#1A6DB5' },
  { code: 'QZ', name: 'AirAsia',          abbr: 'QZ', color: '#D0021B' },
  { code: 'JT', name: 'Lion Air',         abbr: 'JT', color: '#E65C00' },
  { code: 'ID', name: 'Batik Air',        abbr: 'ID', color: '#8B1A1A' },
  { code: 'CI', name: 'Citilink',         abbr: 'CI', color: '#1E8449' },
]

export const airlineThemes = {
  GA: {
    gradient: 'linear-gradient(135deg, #020e28 0%, #041847 60%, #020e28 100%)',
    primary:  '#1A6DB5',
    accent:   '#DDAA3F',
    glow:     'rgba(26,109,181,0.4)',
    cardBg:   'rgba(26,109,181,0.1)',
    border:   'rgba(26,109,181,0.5)',
    badge:    { bg: 'rgba(221,170,63,0.15)', color: '#DDAA3F', border: 'rgba(221,170,63,0.3)' },
    btnBg:    'linear-gradient(135deg, #1A6DB5, #0D4A8A)',
    name:     'Garuda Indonesia',
  },
  QZ: {
    gradient: 'linear-gradient(135deg, #180306 0%, #2d050a 60%, #180306 100%)',
    primary:  '#D0021B',
    accent:   '#FF6B6B',
    glow:     'rgba(208,2,27,0.4)',
    cardBg:   'rgba(208,2,27,0.1)',
    border:   'rgba(208,2,27,0.5)',
    badge:    { bg: 'rgba(255,107,107,0.15)', color: '#FF6B6B', border: 'rgba(255,107,107,0.3)' },
    btnBg:    'linear-gradient(135deg, #D0021B, #9B0014)',
    name:     'AirAsia',
  },
  JT: {
    gradient: 'linear-gradient(135deg, #170800 0%, #2d1000 60%, #170800 100%)',
    primary:  '#E65C00',
    accent:   '#FF8C42',
    glow:     'rgba(230,92,0,0.4)',
    cardBg:   'rgba(230,92,0,0.1)',
    border:   'rgba(230,92,0,0.5)',
    badge:    { bg: 'rgba(255,140,66,0.15)', color: '#FF8C42', border: 'rgba(255,140,66,0.3)' },
    btnBg:    'linear-gradient(135deg, #E65C00, #B54800)',
    name:     'Lion Air',
  },
  ID: {
    gradient: 'linear-gradient(135deg, #050d20 0%, #0a1840 60%, #050d20 100%)',
    primary:  '#8B1A1A',
    accent:   '#DDAA3F',
    glow:     'rgba(139,26,26,0.4)',
    cardBg:   'rgba(139,26,26,0.1)',
    border:   'rgba(139,26,26,0.5)',
    badge:    { bg: 'rgba(221,170,63,0.15)', color: '#DDAA3F', border: 'rgba(221,170,63,0.3)' },
    btnBg:    'linear-gradient(135deg, #8B1A1A, #5C1111)',
    name:     'Batik Air',
  },
  CI: {
    gradient: 'linear-gradient(135deg, #031108 0%, #062016 60%, #031108 100%)',
    primary:  '#1E8449',
    accent:   '#58D68D',
    glow:     'rgba(30,132,73,0.4)',
    cardBg:   'rgba(30,132,73,0.1)',
    border:   'rgba(30,132,73,0.5)',
    badge:    { bg: 'rgba(88,214,141,0.15)', color: '#58D68D', border: 'rgba(88,214,141,0.3)' },
    btnBg:    'linear-gradient(135deg, #1E8449, #155E34)',
    name:     'Citilink',
  },
}

const rid = () => 'TRB-' + Math.random().toString(36).substr(2, 6).toUpperCase()

export const generateFlights = (fromCode, toCode) => {
  const from = airports.find(a => a.code === fromCode) || airports[0]
  const to   = airports.find(a => a.code === toCode)   || airports[1]
  return [
    {
      id: rid(), airline: airlines[0], flightNumber: 'GA-401',
      from, to,
      departTime: '06:00', arriveTime: '07:35', duration: '1j 35m',
      stops: 0, stopDetails: [],
      price: 1_890_000, originalPrice: 2_250_000,
      seatsLeft: 12, flightClass: 'Ekonomi',
      baggage: '23kg', meal: true, wifi: true,
      facilities: ['Makan', 'WiFi', '23kg Bagasi', 'Selimut'],
      rating: 4.7,
      badge: 'Terpopuler',
    },
    {
      id: rid(), airline: airlines[4], flightNumber: 'CI-803',
      from, to,
      departTime: '08:30', arriveTime: '10:00', duration: '1j 30m',
      stops: 0, stopDetails: [],
      price: 720_000, originalPrice: 890_000,
      seatsLeft: 28, flightClass: 'Ekonomi',
      baggage: '20kg', meal: false, wifi: false,
      facilities: ['20kg Bagasi'],
      rating: 4.3,
      badge: 'Hemat',
    },
    {
      id: rid(), airline: airlines[1], flightNumber: 'QZ-7801',
      from, to,
      departTime: '09:15', arriveTime: '10:45', duration: '1j 30m',
      stops: 0, stopDetails: [],
      price: 650_000, originalPrice: 850_000,
      seatsLeft: 34, flightClass: 'Ekonomi',
      baggage: '20kg', meal: false, wifi: false,
      facilities: ['20kg Bagasi'],
      rating: 4.2,
      badge: 'Termurah',
    },
    {
      id: rid(), airline: airlines[2], flightNumber: 'JT-503',
      from, to,
      departTime: '13:30', arriveTime: '15:10', duration: '1j 40m',
      stops: 0, stopDetails: [],
      price: 730_000, originalPrice: 730_000,
      seatsLeft: 56, flightClass: 'Ekonomi',
      baggage: '20kg', meal: false, wifi: false,
      facilities: ['20kg Bagasi'],
      rating: 4.0,
      badge: null,
    },
    {
      id: rid(), airline: airlines[3], flightNumber: 'ID-7150',
      from, to,
      departTime: '16:20', arriveTime: '17:55', duration: '1j 35m',
      stops: 0, stopDetails: [],
      price: 980_000, originalPrice: 1_250_000,
      seatsLeft: 21, flightClass: 'Ekonomi',
      baggage: '23kg', meal: true, wifi: false,
      facilities: ['Makan', '23kg Bagasi'],
      rating: 4.4,
      badge: 'Premium',
    },
    {
      id: rid(), airline: airlines[2], flightNumber: 'JT-610',
      from, to,
      departTime: '19:00', arriveTime: '21:15', duration: '2j 15m',
      stops: 1, stopDetails: [{ airport: 'SUB', duration: '40m' }],
      price: 580_000, originalPrice: 580_000,
      seatsLeft: 48, flightClass: 'Ekonomi',
      baggage: '20kg', meal: false, wifi: false,
      facilities: ['20kg Bagasi'],
      rating: 3.9,
      badge: null,
    },
  ]
}

export const formatPrice = (n) =>
  'Rp ' + n.toLocaleString('id-ID')

export const popularDestinations = [
  { from: 'CGK', to: 'DPS', fromCity: 'Jakarta',    toCity: 'Bali',        price: 650_000,  duration: '1j 30m',  gradient: 'linear-gradient(140deg,#0F6B9E,#0B4F9C,#052244)' },
  { from: 'CGK', to: 'SUB', fromCity: 'Jakarta',    toCity: 'Surabaya',    price: 450_000,  duration: '1j 15m',  gradient: 'linear-gradient(140deg,#1D6B3A,#0E4A24,#062A14)' },
  { from: 'CGK', to: 'SIN', fromCity: 'Jakarta',    toCity: 'Singapura',   price: 1_200_000,duration: '1j 45m',  gradient: 'linear-gradient(140deg,#1A3A7A,#0E2456,#060E30)' },
  { from: 'CGK', to: 'KUL', fromCity: 'Jakarta',    toCity: 'Kl. Lumpur',  price: 980_000,  duration: '2j 0m',   gradient: 'linear-gradient(140deg,#7A1A1A,#541010,#300808)' },
  { from: 'CGK', to: 'BKK', fromCity: 'Jakarta',    toCity: 'Bangkok',     price: 1_450_000,duration: '3j 30m',  gradient: 'linear-gradient(140deg,#0A6B8A,#063E54,#031E2E)' },
  { from: 'DPS', to: 'NRT', fromCity: 'Bali',       toCity: 'Tokyo',       price: 3_200_000,duration: '7j 45m',  gradient: 'linear-gradient(140deg,#4A0E7A,#2E065C,#120230)' },
]
