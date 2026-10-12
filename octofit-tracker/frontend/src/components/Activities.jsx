import { fetch as fetchApi } from '../api.js'
import ApiResourceTable from './ApiResourceTable.jsx'

function displayDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}

function displayName(value) {
  if (!value) return '—'
  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value.email || value._id || '—'
  }
  return value
}

const columns = [
  { heading: 'Activity', value: (activity) => activity.type || activity.name || 'Activity' },
  { heading: 'Athlete', value: (activity) => displayName(activity.user) },
  { heading: 'Duration', value: (activity) => activity.durationMinutes == null ? '—' : `${activity.durationMinutes} min` },
  { heading: 'Calories', value: (activity) => activity.calories ?? '—' },
  { heading: 'Date', value: (activity) => displayDate(activity.recordedAt || activity.createdAt) },
]

function Activities() {
  return (
    <ApiResourceTable
      columns={columns}
      description="A look at the effort your community has put in."
      endpoint="/api/activities/"
      fetcher={fetchApi}
      title="Activities"
    />
  )
}

export default Activities
