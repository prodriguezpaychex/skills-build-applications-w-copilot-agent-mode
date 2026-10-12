import ApiResourceTable from './ApiResourceTable.jsx'

function displayName(value) {
  if (!value) return '—'
  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value._id || '—'
  }
  return value
}

const columns = [
  { heading: 'Workout', value: (workout) => workout.name || 'Workout' },
  { heading: 'Category', value: (workout) => workout.category || '—' },
  { heading: 'Duration', value: (workout) => workout.durationMinutes == null ? '—' : `${workout.durationMinutes} min` },
  { heading: 'Athlete', value: (workout) => displayName(workout.user) },
  { heading: 'Description', value: (workout) => workout.description || '—' },
]

function Workouts() {
  return (
    <ApiResourceTable
      columns={columns}
      description="Get inspired by workouts created for your fitness journey."
      endpoint="/api/workouts/"
      title="Workouts"
    />
  )
}

export default Workouts
