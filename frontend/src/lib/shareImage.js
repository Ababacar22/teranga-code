function baseCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const bgGradient = ctx.createLinearGradient(0, 0, width, height)
  bgGradient.addColorStop(0, '#f2dfb8')
  bgGradient.addColorStop(1, '#d9bd85')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(0, 133, 63, 0.15)'
  ctx.beginPath()
  ctx.arc(width - 120, 100, 160, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#00853f'
  ctx.fillRect(0, 0, width, 16)
  ctx.fillStyle = '#fdc700'
  ctx.fillRect(0, 16, width, 8)
  ctx.fillStyle = '#e31b23'
  ctx.fillRect(0, 24, width, 8)

  ctx.fillStyle = '#2b1d0e'
  ctx.font = '700 32px sans-serif'
  ctx.fillText('Teranga Code', 60, 100)

  return { canvas, ctx }
}

export function drawProfileCard({ pseudo, level, xp, badgesCount, streakCurrent, badgeEmojis }) {
  const { canvas, ctx } = baseCanvas(1000, 620)

  ctx.font = '800 64px sans-serif'
  ctx.fillStyle = '#05612e'
  ctx.fillText(pseudo, 60, 220)

  ctx.font = '600 30px sans-serif'
  ctx.fillStyle = '#2b1d0e'
  ctx.fillText(`Niveau ${level}`, 60, 280)

  ctx.font = '800 90px sans-serif'
  ctx.fillStyle = '#e31b23'
  ctx.fillText(`${xp} XP`, 60, 400)

  ctx.font = '600 34px sans-serif'
  ctx.fillStyle = '#2b1d0e'
  ctx.fillText(`🏅 ${badgesCount} badge${badgesCount > 1 ? 's' : ''} obtenus`, 60, 460)

  if (streakCurrent > 0) {
    ctx.font = '600 26px sans-serif'
    ctx.fillStyle = '#c97b3d'
    ctx.fillText(`🔥 ${streakCurrent} jour${streakCurrent > 1 ? 's' : ''} de suite`, 60, 500)
  }

  if (badgeEmojis?.length) {
    ctx.font = '54px sans-serif'
    badgeEmojis.slice(0, 12).forEach((emoji, i) => {
      ctx.fillText(emoji, 60 + i * 58, 570)
    })
  }

  ctx.font = '500 22px sans-serif'
  ctx.fillStyle = '#6b5a42'
  ctx.fillText('Prépare tes entretiens tech en voyageant à travers le Sénégal', 60, 600)

  return canvas
}

export function drawBadgeCard({ pseudo, badgeEmoji, badgeName, topicTitle }) {
  const { canvas, ctx } = baseCanvas(1000, 560)

  ctx.font = '160px sans-serif'
  ctx.fillText(badgeEmoji, 60, 280)

  ctx.font = '800 52px sans-serif'
  ctx.fillStyle = '#05612e'
  ctx.fillText(badgeName, 60, 360)

  ctx.font = '600 28px sans-serif'
  ctx.fillStyle = '#2b1d0e'
  ctx.fillText(`Débloqué en maîtrisant "${topicTitle}"`, 60, 410)

  ctx.font = '600 26px sans-serif'
  ctx.fillStyle = '#6b5a42'
  ctx.fillText(`— ${pseudo}`, 60, 460)

  ctx.font = '500 22px sans-serif'
  ctx.fillStyle = '#6b5a42'
  ctx.fillText('Teranga Code — prépare tes entretiens tech en jouant', 60, 520)

  return canvas
}

export async function shareOrDownloadCanvas(canvas, fileName, shareTitle, shareText) {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  const file = new File([blob], fileName, { type: 'image/png' })

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: shareTitle, text: shareText })
      return
    } catch {
      // annulé ou échoué — on retombe sur le téléchargement
    }
  }

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
