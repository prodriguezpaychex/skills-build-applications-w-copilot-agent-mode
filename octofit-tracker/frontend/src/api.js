const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(endpoint) {
  return new URL(endpoint, API_BASE_URL).toString()
}

export function fetch(endpoint, options) {
  return globalThis.fetch(getApiUrl(endpoint), options)
}

export function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'docs', 'data']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }

    if (payload.data && typeof payload.data === 'object') {
      return getRecords(payload.data)
    }
  }

  throw new Error('The API returned an unsupported response format.')
}
