function StreakBadge({ current, longest }) {
  if (current === 0) return null

  return (
    <div className="streak-badge" title={`Record : ${longest} jours`}>
      <span className="streak-badge__flame">🔥</span>
      <span>
        {current} jour{current > 1 ? 's' : ''} de suite
      </span>
    </div>
  )
}

export default StreakBadge
