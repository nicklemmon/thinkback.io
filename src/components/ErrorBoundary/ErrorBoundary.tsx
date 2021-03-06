import React, { ErrorInfo } from 'react'
import { DefaultLayout } from 'src/layouts'
import { Page } from 'src/components'
import { Button, VStack } from 'src/components/chakra'

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
        <DefaultLayout authenticated={false}>
          <Page>
            <Page.Header>
              <Page.Title>Something went wrong</Page.Title>
            </Page.Header>

            <Page.Content>
              <VStack spacing={8}>
                <p>
                  Unfortunately, accidents happen. Something went wrong and will be fixed shortly.
                </p>

                <Button level="primary" as="a" href="/">
                  Save me!
                </Button>
              </VStack>
            </Page.Content>
          </Page>
        </DefaultLayout>
      )
    }

    return this.props.children
  }
}
