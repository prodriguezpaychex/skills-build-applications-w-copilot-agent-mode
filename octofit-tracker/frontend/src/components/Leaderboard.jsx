import { fetch as fetchApi } from '../api.js'
import ApiResourceTable from './ApiResourceTable.jsx'

function displayName(value) {
  if (!value) return '—'
  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value._id || '—'
  }
  return value
}

const columns = [
  { heading: 'Rank', value: (entry) => entry.rank ?? '—' },
  { heading: 'Athlete', value: (entry) => displayName(entry.user) },
  { heading: 'Team', value: (entry) => displayName(entry.team) },
  { heading: 'Points', value: (entry) => entry.points ?? '—' },
]

function Leaderboard() {
  return (
    <ApiResourceTable
      columns={columns}
      description="Celebrate the consistency and achievements of the community."
      endpoint="/api/leaderboard/"
      fetcher={fetchApi}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
