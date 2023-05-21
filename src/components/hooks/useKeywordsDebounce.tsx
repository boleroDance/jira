import { useState, useEffect } from 'react'

export default function useKeywordsDebounce<T> (keywords: T, delay?: number) {
  const [debounceKeywords, setDebounceKeywords] = useState(keywords)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceKeywords(keywords)
    }, delay)

    return () => clearTimeout(timeout)
  }, [keywords, delay])

  return debounceKeywords
}

