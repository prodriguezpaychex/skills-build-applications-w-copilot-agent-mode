import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="welcome-panel">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>Make every move count.</h1>
      <p className="lead">
        Track activity, find your team, and keep your next workout in sight.
      </p>
      <div className="row g-3 mt-3">
        {navigation.slice(1).map(({ label, to }) => (
          <div className="col-12 col-sm-6 col-lg-4" key={to}>
            <NavLink className="overview-link" to={to}>
              <span>{label}</span>
              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/" aria-label="Octofit Tracker home">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>Octofit <strong>Tracker</strong></span>
        </NavLink>
        <nav className="navbar-nav flex-row flex-wrap" aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container app-content">
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
      <footer className="app-footer">Move together. Get stronger.</footer>
    </div>
  )
}

export default App
