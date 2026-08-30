import { drawBadgeCard, shareOrDownloadCanvas } from '../lib/shareImage'

function BadgeShareButton({ pseudo, badgeEmoji, badgeName, topicTitle }) {
  async function handleShare(e) {
    e.stopPropagation()
    const canvas = drawBadgeCard({ pseudo, badgeEmoji, badgeName, topicTitle })
    await shareOrDownloadCanvas(
      canvas,
      `teranga-code-badge-${badgeName}.png`,
      `Badge ${badgeName} — Teranga Code`,
      `Je viens de débloquer le badge ${badgeEmoji} ${badgeName} sur Teranga Code !`,
    )
  }

  return (
    <button type="button" className="badge-share-btn" onClick={handleShare} aria-label={`Partager le badge ${badgeName}`}>
      📤
    </button>
  )
}

export default BadgeShareButton
