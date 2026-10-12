import { fetch as fetchApi } from '../api.js'
import ApiResourceTable from './ApiResourceTable.jsx'

function memberCount(members) {
  return Array.isArray(members) ? members.length : '—'
}

const columns = [
  { heading: 'Team', value: (team) => team.name || 'Team' },
  { heading: 'About', value: (team) => team.description || '—' },
  { heading: 'Members', value: (team) => memberCount(team.members) },
]

function Teams() {
  return (
    <ApiResourceTable
      columns={columns}
      description="Find your crew and keep each other moving."
      endpoint="/api/teams/"
      fetcher={fetchApi}
      title="Teams"
    />
  )
}

export default Teams
