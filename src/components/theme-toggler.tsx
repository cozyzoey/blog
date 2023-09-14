import { useEffect } from 'react'
import { useSyncExternalStore } from 'react'
import themeStore, { Theme } from 'store/theme-store'

interface Props {
  children: (props: {
    theme: Theme
    toggleTheme: (theme: Theme) => void
  }) => JSX.Element
}

export default function ({ children }: Props) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapShot,
    themeStore.getServerSnapshot
  )

  const toggleTheme = () => {
    const newValue = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newValue)
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue })
    )
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children({ theme, toggleTheme })
}
