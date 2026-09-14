/**
 * CasaOS theme helper (light / dark).
 *
 * The theme is an explicit user choice stored in localStorage under the key
 * `casaos_theme`. When no explicit choice has been made yet, the system
 * preference (prefers-color-scheme) is used — mirroring the `color-scheme: dark`
 * behaviour of the Dark Reader reference capture.
 */

export const THEME_STORAGE_KEY = 'casaos_theme'

export function getInitialTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') {
    return stored
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  const dark = theme === 'dark'

  if (dark) {
    root.setAttribute('data-theme', 'dark')
  }
  else {
    root.removeAttribute('data-theme')
  }

  root.style.colorScheme = dark ? 'dark' : 'light'
}