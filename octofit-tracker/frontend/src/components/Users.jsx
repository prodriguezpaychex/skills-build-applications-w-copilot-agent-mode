import ApiResourceTable from './ApiResourceTable.jsx'

const columns = [
  { heading: 'Name', value: (user) => user.displayName || user.username || 'Athlete' },
  { heading: 'Username', value: (user) => user.username || '—' },
  { heading: 'Email', value: (user) => user.email || '—' },
]

function Users() {
  return (
    <ApiResourceTable
      columns={columns}
      description="Meet the athletes who make up the Octofit community."
      endpoint="/api/users/"
      title="Users"
    />
  )
}

export default Users
