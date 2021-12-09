import { Alert, AlertIcon, AlertTitle, AlertDescription } from 'src/components/chakra'

type ApiAlertProps = {
  title: string
  onRetry: () => void
}

export function ApiAlert({ title, onRetry }: ApiAlertProps) {
  return (
    <Alert status="error">
      <AlertIcon />

      <AlertTitle>{title}</AlertTitle>

      <AlertDescription>
        Please <button onClick={onRetry}>try again</button>.
      </AlertDescription>
    </Alert>
  )
}
