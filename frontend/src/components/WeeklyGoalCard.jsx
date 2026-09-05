function WeeklyGoalCard({ weeklyXp, weeklyTarget }) {
  const pct = Math.min(100, Math.round((weeklyXp / weeklyTarget) * 100))
  const reached = weeklyXp >= weeklyTarget

  return (
    <div className="weekly-goal">
      <div className="weekly-goal__header">
        <strong>🎯 Objectif de la semaine</strong>
        <span>
          {weeklyXp} / {weeklyTarget} XP
        </span>
      </div>
      <div className="weekly-goal__bar">
        <div className="weekly-goal__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      {reached && <p className="weekly-goal__done">🎉 Objectif atteint cette semaine — continue comme ça !</p>}
    </div>
  )
}

export default WeeklyGoalCard
