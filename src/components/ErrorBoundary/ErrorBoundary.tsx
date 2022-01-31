import React, { ErrorInfo } from 'react'
import { Page } from 'src/components'
import { Button, Link, VStack } from 'src/components/chakra'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Could add a reporting service here like LogRocket/Sentry
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Page>
          <Page.Header>
            <Page.Title>Something went wrong</Page.Title>
          </Page.Header>

          <Page.Content>
            <VStack>
              <p>
                Unfortunately, accidents happen. Something went wrong and will be reported to be
                fixed shortly.
              </p>

              <Button level="primary" as="a" href="/">
                Save me!
              </Button>
            </VStack>
          </Page.Content>
        </Page>
      )
    }

    return this.props.children
  }
}
