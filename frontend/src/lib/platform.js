// Application desktop (Tauri) : aucun serveur, tout tourne localement sur l'appareil.
export const isDesktopApp =
  typeof window !== 'undefined' && ('__TAURI_INTERNALS__' in window || '__TAURI__' in window)
