import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const useBookDetail = (id) => {
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItem = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw new Error(error.message)
      setItem(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return { item, isLoading, error, refetch: fetchItem }
}

export default useBookDetail
