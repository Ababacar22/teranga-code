const QUEUE_KEY = 'teranga-pending-actions'

export function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY)) || []
  } catch {
    return []
  }
}

function writeQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {
    // stockage indisponible — l'action ne sera pas rejouée au retour du réseau
  }
}

export function pushToQueue(action) {
  const queue = readQueue()
  queue.push({ ...action, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` })
  writeQueue(queue)
}

export function removeFromQueue(id) {
  writeQueue(readQueue().filter((a) => a.id !== id))
}

export function queueLength() {
  return readQueue().length
}
