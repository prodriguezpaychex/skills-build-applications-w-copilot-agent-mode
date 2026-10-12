import { useEffect, useState } from 'react'
import { getApiUrl, getRecords } from '../api.js'

function ApiResourceTable({ columns, description, endpoint, fetcher, title }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(endpoint, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`The request failed with status ${response.status}.`)
        }

        setRecords(getRecords(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this information.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher, refreshCount])

  return (
    <section className="resource-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR OCTOFIT COMMUNITY</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <button
          className="btn btn-outline-success"
          disabled={loading}
          onClick={() => setRefreshCount((count) => count + 1)}
          type="button"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="status-message" role="status">Loading {title.toLowerCase()}…</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">Could not load {title.toLowerCase()}: {error}</p>
          <p className="mb-0">Check that the API is available at {getApiUrl(endpoint)}.</p>
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <div className="empty-state">No {title.toLowerCase()} to show yet.</div>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive resource-table-wrap">
          <table className="table align-middle resource-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.heading} scope="col">{column.heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || index}>
                  {columns.map((column) => (
                    <td key={column.heading}>{column.value(record)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="record-count">{records.length} {records.length === 1 ? 'record' : 'records'}</p>
    </section>
  )
}

export default ApiResourceTable
