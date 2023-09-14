export type Theme = 'light' | 'dark'

export default {
  subscribe: (callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => {
      window.removeEventListener('storage', callback)
    }
  },
  getSnapShot: (): Theme => (localStorage.getItem('theme') as Theme) ?? 'light',
  getServerSnapshot: (): Theme => 'light',
}
