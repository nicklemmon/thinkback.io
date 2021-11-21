import { useCallback } from 'react'
import { useToast as useChakraToast } from '@chakra-ui/toast'
import { Toast } from 'src/types'

export function useToast() {
  const toast = useChakraToast()

  const showToast = useCallback(
    ({ message, variant }: Toast) => {
      return toast({
        title: message,
        status: variant,
        duration: 5000,
        isClosable: true,
      })
    },
    [toast],
  )

  return { showToast }
}
