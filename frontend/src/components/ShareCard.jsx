import { drawProfileCard, shareOrDownloadCanvas } from '../lib/shareImage'

function ShareCard({ pseudo, level, xp, badgesCount, streakCurrent, badgeEmojis }) {
  async function handleShare() {
    const canvas = drawProfileCard({ pseudo, level, xp, badgesCount, streakCurrent, badgeEmojis })
    await shareOrDownloadCanvas(canvas, `teranga-code-${pseudo}.png`, 'Mon score Teranga Code')
  }

  return (
    <button className="btn btn--primary" onClick={handleShare}>
      📤 Partager mon score
    </button>
  )
}

export default ShareCard
