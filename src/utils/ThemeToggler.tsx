import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface Props {
  children: (props: {
    theme: Theme
    toggleTheme: (theme: Theme) => void
  }) => JSX.Element
}

export default function ({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(
    typeof window !== 'undefined'
      ? localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light'
      : 'light'
  )

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.theme = newTheme
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children({ theme, toggleTheme })
}
