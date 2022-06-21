import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Heading, Spinner, VStack } from 'src/components/chakra'
import { Container } from 'src/components'

const DEFAULT_PAGE_LOADER_TIMEOUT = 0

type PageProps = {
  children: React.ReactNode
}

type PageHeaderProps = {
  children: React.ReactNode
}

type PageTitleProps = {
  children: React.ReactNode
}

type PageContentProps = {
  children: React.ReactNode
  breakout?: boolean
}

function Page({ children }: PageProps) {
  return <>{children}</>
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <Box paddingTop="8" paddingBottom="8" bg="gray.50">
      <Container>
        <VStack spacing={6}>{children}</VStack>
      </Container>
    </Box>
  )
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <>
      <Helmet defer={false}>
        {/* TODO: Should probably convert this to a string or there is room for a bug here */}
        {/* TODO: Need to be able to handle page categories */}
        <title>{children} | ThinkBack</title>
      </Helmet>

      <Heading as="h1" fontSize={40} color="gray.700">
        {children}
      </Heading>
    </>
  )
}

function PageContent({ children, breakout }: PageContentProps) {
  return (
    <Box paddingTop="8" paddingBottom="8">
      <Container transform={breakout ? 'translateY(-3.5rem);' : undefined}>{children}</Container>
    </Box>
  )
}

/** Page loader that only renders if the duration in MS passes */
function PageLoader({ duration = DEFAULT_PAGE_LOADER_TIMEOUT }: { duration?: number }) {
  const [rendered, setRendered] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      return setRendered(true)
    }, duration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!rendered) return null

  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
      <Spinner size="xl" color="purple.400" thickness="4px" />
    </Box>
  )
}

Page.Header = PageHeader
Page.Title = PageTitle
Page.Content = PageContent
Page.Loader = PageLoader

export { Page }
