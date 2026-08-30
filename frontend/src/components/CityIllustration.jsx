import { motion } from 'framer-motion'

const pulse = {
  animate: { opacity: [1, 0.7, 1] },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
}

function drift(distance = 10, duration = 6) {
  return {
    animate: { x: [0, distance, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  }
}

function bob(distance = 3, duration = 3) {
  return {
    animate: { y: [0, -distance, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  }
}

const SCENES = {
  dakar: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="100" width="200" height="40" fill="#2f8fa3" />
      <path d="M0 106 Q20 102 40 106 T80 106 T120 106 T160 106 T200 106" stroke="#1e6b7a" strokeWidth="1.5" fill="none" opacity="0.5" />
      <motion.circle cx="160" cy="35" r="18" fill="var(--sn-yellow)" {...pulse} />
      {/* Monument de la Renaissance africaine, en arrière-plan sur la colline */}
      <polygon points="20,68 32,68 26,50" fill="#8a7a63" opacity="0.6" />
      <rect x="24" y="42" width="4" height="10" fill="#8a7a63" opacity="0.6" />
      <path d="M24 44 L18 36 M28 44 L34 36" stroke="#8a7a63" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <rect x="40" y="55" width="14" height="50" fill="#c97b3d" />
      <polygon points="30,55 64,55 47,25" fill="var(--sn-green-dark)" />
      <rect x="90" y="70" width="10" height="35" fill="var(--ink)" />
      <polygon points="85,70 105,70 95,45" fill="var(--sn-red)" />
      <rect x="115" y="80" width="9" height="25" fill="#c97b3d" opacity="0.85" />
      <polygon points="110,80 129,80 119,60" fill="var(--sn-yellow)" opacity="0.85" />
      <motion.g {...drift(14, 8)}>
        <path d="M15 30 Q20 25 25 30" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M25 26 Q30 21 35 26" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </motion.g>
      <motion.g {...drift(18, 10)}>
        <polygon points="150,118 172,118 161,106" fill="var(--sn-red)" opacity="0.8" />
      </motion.g>
    </>
  ),
  'saint-louis': (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="95" width="200" height="45" fill="#5fb8c9" />
      <path d="M0 130 Q30 126 60 130 T120 130 T180 130 T200 130" stroke="#3d95a8" strokeWidth="1.5" fill="none" opacity="0.5" />
      <rect x="20" y="90" width="160" height="6" fill="#8a8a8a" />
      {[30, 60, 90, 120, 150].map((x) => (
        <rect key={x} x={x} y="70" width="4" height="26" fill="#8a8a8a" />
      ))}
      <path d="M20 90 Q100 60 180 90" stroke="#8a8a8a" strokeWidth="4" fill="none" />
      <rect x="60" y="40" width="18" height="30" fill="#c97b3d" />
      <rect x="63" y="45" width="4" height="5" fill="var(--paper)" opacity="0.7" />
      <rect x="71" y="45" width="4" height="5" fill="var(--paper)" opacity="0.7" />
      <rect x="90" y="35" width="18" height="35" fill="#e0b98c" />
      <rect x="93" y="42" width="4" height="5" fill="var(--paper)" opacity="0.7" />
      <rect x="101" y="42" width="4" height="5" fill="var(--paper)" opacity="0.7" />
      <motion.g {...drift(20, 7)}>
        <polygon points="15,120 35,120 25,108" fill="var(--sn-red)" />
        <rect x="24" y="100" width="1.5" height="10" fill="var(--ink)" />
      </motion.g>
      <motion.g {...drift(-16, 9)}>
        <polygon points="145,128 163,128 154,118" fill="var(--sn-yellow)" opacity="0.85" />
        <rect x="153" y="110" width="1.5" height="9" fill="var(--ink)" />
      </motion.g>
    </>
  ),
  thies: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <path d="M0 92 Q40 78 80 92 T160 92 T200 90" stroke="#e3cd9c" strokeWidth="10" fill="none" opacity="0.6" />
      <rect y="110" width="200" height="30" fill="#d9bd85" />
      <rect x="20" y="90" width="160" height="6" fill="#8a8a8a" />
      <rect x="60" y="75" width="50" height="20" rx="4" fill="var(--sn-red)" />
      <rect x="10" y="78" width="46" height="16" rx="3" fill="#a83a3a" opacity="0.75" />
      <circle cx="70" cy="98" r="6" fill="var(--ink)" />
      <circle cx="100" cy="98" r="6" fill="var(--ink)" />
      <circle cx="20" cy="97" r="5" fill="var(--ink)" />
      <circle cx="45" cy="97" r="5" fill="var(--ink)" />
      <polygon points="30,60 50,60 50,90 30,90" fill="var(--sn-green)" opacity="0.7" />
      <polygon points="140,55 165,60 160,90 135,85" fill="var(--sn-yellow)" opacity="0.8" />
      <polygon points="150,95 170,98 168,118 148,116" fill="var(--clay)" opacity="0.6" />
      <motion.g animate={{ opacity: [0.6, 0, 0.6], y: [0, -10, -18] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}>
        <circle cx="62" cy="68" r="4" fill="#ddd" />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.5, 0, 0.5], y: [0, -12, -20] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
      >
        <circle cx="14" cy="72" r="3.5" fill="#ddd" />
      </motion.g>
    </>
  ),
  touba: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="115" width="200" height="25" fill="#d9bd85" />
      <rect x="70" y="70" width="60" height="45" fill="var(--paper)" stroke="var(--border)" />
      <rect x="80" y="80" width="8" height="12" fill="var(--border)" opacity="0.5" />
      <rect x="112" y="80" width="8" height="12" fill="var(--border)" opacity="0.5" />
      <polygon points="100,40 130,70 70,70" fill="var(--sn-green-dark)" />
      <rect x="94" y="20" width="12" height="24" fill="var(--sn-green-dark)" />
      <motion.circle cx="100" cy="16" r="5" fill="var(--sn-yellow)" {...pulse} />
      <rect x="55" y="85" width="12" height="30" fill="var(--paper)" stroke="var(--border)" />
      <rect x="59" y="30" width="6" height="18" fill="var(--sn-green-dark)" opacity="0.85" />
      <motion.circle cx="62" cy="27" r="3" fill="var(--sn-yellow)" {...pulse} />
      <rect x="133" y="85" width="12" height="30" fill="var(--paper)" stroke="var(--border)" />
      <rect x="135" y="30" width="6" height="18" fill="var(--sn-green-dark)" opacity="0.85" />
      <motion.circle cx="138" cy="27" r="3" fill="var(--sn-yellow)" transition={{ ...pulse.transition, delay: 0.6 }} animate={pulse.animate} />
      <motion.g {...drift(10, 11)}>
        <path d="M20 45 Q26 38 32 45" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </motion.g>
      <motion.g {...drift(-12, 9)}>
        <path d="M160 55 Q166 48 172 55" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </motion.g>
      {[45, 65, 145, 165].map((x) => (
        <circle key={x} cx={x} cy={130} r="2.2" fill="var(--ink)" opacity="0.5" />
      ))}
    </>
  ),
  kaolack: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="100" width="200" height="40" fill="#e7d9b0" />
      <ellipse cx="60" cy="115" rx="30" ry="8" fill="#fff" opacity="0.8" />
      <ellipse cx="130" cy="122" rx="35" ry="7" fill="#fff" opacity="0.7" />
      <ellipse cx="95" cy="108" rx="20" ry="5" fill="#fff" opacity="0.6" />
      <motion.circle cx="150" cy="30" r="16" fill="var(--sn-yellow)" {...pulse} />
      <path d="M40 95 Q45 80 50 95" stroke="var(--sn-green-dark)" strokeWidth="3" fill="none" />
      <path d="M55 95 Q60 78 65 95" stroke="var(--sn-green-dark)" strokeWidth="3" fill="none" />
      <path d="M170 95 Q175 82 180 95" stroke="var(--sn-green-dark)" strokeWidth="3" fill="none" opacity="0.8" />
      <rect x="20" y="60" width="10" height="18" fill="#c97b3d" opacity="0.7" />
      <polygon points="16,60 34,60 25,48" fill="var(--clay)" opacity="0.7" />
      <motion.g {...drift(12, 9)}>
        <path d="M20 40 Q25 35 30 40" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </motion.g>
      <motion.g {...drift(-10, 7)}>
        <path d="M110 45 Q115 40 120 45" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </motion.g>
    </>
  ),
  ziguinchor: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="90" width="200" height="50" fill="#2f8fa3" />
      <path d="M20 95 Q60 80 100 95 T180 95" stroke="#1e6b7a" strokeWidth="4" fill="none" />
      <polygon points="90,70 110,90 70,90" fill="#c97b3d" />
      <rect x="88" y="60" width="4" height="12" fill="var(--ink)" />
      {[30, 150].map((x) => (
        <motion.g key={x} transform={`translate(${x} 60)`} animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <ellipse cx="0" cy="10" rx="16" ry="10" fill="var(--sn-green-dark)" />
          <ellipse cx="10" cy="18" rx="12" ry="8" fill="var(--sn-green)" />
        </motion.g>
      ))}
      <motion.g {...drift(22, 10)}>
        <polygon points="45,118 63,118 55,110" fill="var(--clay)" opacity="0.85" />
        <rect x="53" y="100" width="1.5" height="10" fill="var(--ink)" />
      </motion.g>
    </>
  ),
  tambacounda: (
    <>
      <rect width="200" height="140" fill="#f5e0a8" />
      <rect y="110" width="200" height="30" fill="#d3a95f" />
      <motion.circle cx="155" cy="30" r="17" fill="var(--sn-yellow)" {...pulse} />
      {/* baobab */}
      <g transform="translate(35 60)">
        <rect x="-4" y="20" width="8" height="35" fill="#8a5a35" />
        <ellipse cx="0" cy="14" rx="20" ry="16" fill="var(--sn-green-dark)" opacity="0.8" />
        <path d="M-6 2 L-14 -8 M0 0 L0 -12 M6 2 L14 -8" stroke="#8a5a35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      {/* silhouette de lion, clin d'œil au Niokolo-Koba */}
      <motion.g transform="translate(140 108)" animate={{ x: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} opacity="0.55">
        <ellipse cx="0" cy="0" rx="12" ry="7" fill="var(--clay)" />
        <circle cx="11" cy="-3" r="6" fill="var(--clay)" />
        <path d="M4 -8 Q11 -14 18 -8 Q13 -6 11 -3 Q9 -6 4 -8" fill="#8a5a35" />
        <rect x="-11" y="4" width="2.5" height="8" fill="var(--clay)" />
        <rect x="6" y="4" width="2.5" height="8" fill="var(--clay)" />
      </motion.g>
      {/* rails, héritage de la ligne Dakar-Niger */}
      <rect x="10" y="105" width="150" height="3" fill="#8a8a8a" opacity="0.6" />
      {[20, 40, 60, 80, 100, 120, 140].map((x) => (
        <rect key={x} x={x} y="103" width="3" height="8" fill="#6b6b6b" opacity="0.5" />
      ))}
    </>
  ),
  kolda: (
    <>
      <rect width="200" height="140" fill="#f2e6bc" />
      <rect y="95" width="200" height="45" fill="#2f8fa3" opacity="0.85" />
      <path d="M15 100 Q60 88 100 100 T185 100" stroke="#1e6b7a" strokeWidth="3" fill="none" />
      <motion.circle cx="155" cy="28" r="15" fill="var(--sn-yellow)" {...pulse} />
      {/* champs de coton */}
      {[25, 45, 65].map((x) => (
        <g key={x} transform={`translate(${x} 112)`}>
          <rect x="-1.5" y="0" width="3" height="14" fill="var(--sn-green-dark)" />
          <circle cx="0" cy="-3" r="5" fill="var(--paper)" opacity="0.9" />
        </g>
      ))}
      {/* silhouette de zébu, élevage peul */}
      <motion.g transform="translate(140 100)" animate={{ x: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <ellipse cx="0" cy="10" rx="15" ry="8" fill="var(--clay)" />
        <ellipse cx="0" cy="2" rx="7" ry="6" fill="var(--clay)" />
        <path d="M-10 -2 L-16 -10 M10 -2 L16 -10" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="-13" y="16" width="2.5" height="9" fill="var(--clay)" />
        <rect x="9" y="16" width="2.5" height="9" fill="var(--clay)" />
      </motion.g>
      <motion.g {...drift(-14, 9)}>
        <ellipse cx="60" cy="118" rx="9" ry="5" fill="var(--sn-green)" opacity="0.5" />
      </motion.g>
    </>
  ),
  louga: (
    <>
      <rect width="200" height="140" fill="#f7e6b8" />
      <rect y="105" width="200" height="35" fill="#e0c48a" />
      <path d="M0 105 L200 105" stroke="#c9a563" strokeWidth="3" />
      <path d="M10 140 L90 100" stroke="#b9925a" strokeWidth="6" opacity="0.7" />
      <path d="M110 100 L200 140" stroke="#b9925a" strokeWidth="6" opacity="0.7" />
      <motion.circle cx="160" cy="28" r="15" fill="var(--sn-yellow)" {...pulse} />
      <g transform="translate(50 78)">
        <ellipse cx="0" cy="18" rx="14" ry="8" fill="var(--clay)" />
        <path d="M-8 4 L-13 -6 M8 4 L13 -6" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(30 92)">
        <ellipse cx="0" cy="14" rx="11" ry="6" fill="var(--clay)" opacity="0.85" />
        <path d="M-6 3 L-10 -4 M6 3 L10 -4" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <rect x="140" y="88" width="20" height="12" rx="2" fill="var(--sn-green-dark)" opacity="0.75" />
      <rect x="143" y="82" width="14" height="8" fill="var(--sn-yellow)" opacity="0.7" />
      <motion.g {...drift(10, 8)}>
        <path d="M120 90 L120 70 M120 70 L112 60 M120 70 L128 60" stroke="var(--sn-green-dark)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </motion.g>
      <motion.g {...drift(14, 12)} opacity="0.35">
        <ellipse cx="85" cy="130" rx="10" ry="3" fill="#c9a563" />
      </motion.g>
    </>
  ),
  diourbel: (
    <>
      <rect width="200" height="140" fill="#f5e6bc" />
      <rect y="108" width="200" height="32" fill="#d9bd85" />
      <motion.circle cx="155" cy="30" r="16" fill="var(--sn-yellow)" {...pulse} />
      {/* bâtiment administratif colonial */}
      <rect x="70" y="72" width="60" height="36" fill="var(--paper)" stroke="var(--border)" />
      <rect x="80" y="82" width="8" height="10" fill="var(--border)" opacity="0.5" />
      <rect x="112" y="82" width="8" height="10" fill="var(--border)" opacity="0.5" />
      <polygon points="65,72 135,72 100,52" fill="#a8734a" />
      <rect x="94" y="60" width="12" height="14" fill="#a8734a" />
      {/* silhouette lointaine de Touba, toute proche */}
      <g opacity="0.25" transform="translate(150 90)">
        <polygon points="0,-18 12,0 -12,0" fill="var(--sn-green-dark)" />
        <rect x="-3" y="-28" width="6" height="12" fill="var(--sn-green-dark)" />
      </g>
      {/* plants d'arachide */}
      {[25, 45].map((x) => (
        <g key={x} transform={`translate(${x} 116)`}>
          <path
            d="M0 0 Q-6 -8 -10 -4 M0 0 Q6 -8 10 -4 M0 0 L0 -10"
            stroke="var(--sn-green-dark)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <motion.g {...drift(10, 8)}>
        <path d="M20 45 Q26 38 32 45" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </motion.g>
    </>
  ),
  kedougou: (
    <>
      <rect width="200" height="140" fill="#f3e2c0" />
      <motion.circle cx="160" cy="26" r="15" fill="var(--sn-yellow)" {...pulse} />
      {/* collines superposées, relief rare au Sénégal */}
      <polygon points="0,100 40,60 80,100" fill="#8a6a45" opacity="0.85" />
      <polygon points="50,105 100,55 150,105" fill="#9c7a52" opacity="0.9" />
      <polygon points="110,102 160,68 200,102" fill="#8a6a45" opacity="0.85" />
      <rect y="100" width="200" height="40" fill="#c9a568" />
      {/* pépites / mine à ciel ouvert, clin d'œil à l'or de la région */}
      <g transform="translate(85 110)">
        <rect x="0" y="0" width="30" height="14" fill="#5a4530" opacity="0.6" />
        <circle cx="8" cy="6" r="2.5" fill="var(--sn-yellow)" />
        <circle cx="18" cy="9" r="2" fill="var(--sn-yellow)" />
        <circle cx="24" cy="4" r="1.8" fill="var(--sn-yellow)" />
      </g>
      <motion.g {...drift(12, 8)}>
        <path d="M25 40 Q31 33 37 40" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </motion.g>
    </>
  ),
  mbour: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="102" width="200" height="38" fill="#5fb8c9" />
      <path d="M0 108 Q20 104 40 108 T80 108 T120 108 T160 108 T200 108" stroke="#3d95a8" strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="100" cy="102" rx="90" ry="12" fill="#e7d9b0" />
      {/* pirogues de pêche */}
      <g transform="translate(35 108)">
        <path d="M0 0 Q10 8 20 0" stroke="var(--sn-green-dark)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="8" y="-10" width="2" height="10" fill="var(--ink)" opacity="0.6" />
      </g>
      <g transform="translate(130 112)" opacity="0.85">
        <path d="M0 0 Q10 8 20 0" stroke="var(--sn-red)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="8" y="-9" width="2" height="9" fill="var(--ink)" opacity="0.6" />
      </g>
      {/* boussole / avion, symbole du départ à l'international */}
      <motion.g {...drift(20, 5)} transform="translate(150 30)">
        <path d="M-14 0 L14 0 M0 0 L-6 -6 M0 0 L-6 6" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      </motion.g>
      <circle cx="45" cy="35" r="10" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.5" />
      <path d="M45 25 L45 45 M35 35 L55 35" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
    </>
  ),
  goree: (
    <>
      <rect width="200" height="140" fill="#fdeec0" />
      <rect y="100" width="200" height="40" fill="#5fb8c9" />
      <path d="M0 106 Q20 102 40 106 T80 106 T120 106 T160 106 T200 106" stroke="#3d95a8" strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="90" ry="14" fill="#e7d9b0" />
      <rect x="70" y="60" width="60" height="35" fill="#e0956b" />
      <polygon points="65,60 135,60 100,38" fill="#b06a42" />
      <rect x="85" y="75" width="10" height="20" fill="var(--ink)" />
      <rect x="105" y="75" width="10" height="20" fill="var(--ink)" />
      <rect x="30" y="75" width="22" height="22" fill="#e0b98c" opacity="0.85" />
      <polygon points="27,75 55,75 41,62" fill="#a8734a" opacity="0.85" />
      <rect x="148" y="78" width="18" height="19" fill="#e0956b" opacity="0.8" />
      <polygon points="145,78 169,78 157,66" fill="#b06a42" opacity="0.8" />
      {/* silhouette de canon, rappel du fort historique de l'île */}
      <g transform="translate(20 108)" opacity="0.55">
        <rect x="0" y="4" width="16" height="4" rx="2" fill="var(--ink)" />
        <circle cx="0" cy="6" r="4" fill="var(--ink)" />
      </g>
      <motion.g {...drift(16, 6)}>
        <polygon points="150,112 168,112 159,102" fill="var(--sn-red)" opacity="0.85" />
      </motion.g>
      <motion.g {...bob(2, 4)}>
        <ellipse cx="100" cy="46" rx="6" ry="9" fill="var(--sn-green-dark)" opacity="0.5" />
      </motion.g>
    </>
  ),
}

function CityIllustration({ villeId }) {
  const scene = SCENES[villeId]
  if (!scene) return null

  return (
    <svg className="city-illustration" viewBox="0 0 200 140" role="img" aria-label={`Illustration de ${villeId}`}>
      {scene}
    </svg>
  )
}

export default CityIllustration
