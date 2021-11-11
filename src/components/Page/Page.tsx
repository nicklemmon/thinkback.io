import { Helmet } from 'react-helmet'
import { Box, Heading } from 'src/components/chakra'

type PageProps = {
  children: React.ReactNode
}

type PageTitleProps = {
  children: React.ReactNode
}

type PageContentProps = {
  children: React.ReactNode
}

function Page({ children }: PageProps) {
  return (
    <Box maxW="6xl" marginX="auto">
      {children}
    </Box>
  )
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <>
      <Helmet defer={false}>
        {/* TODO: Should probably convert this to a string or there is room for a bug here */}
        {/* TODO: Need to be able to handle page categories */}
        <title>{children} | Memories App</title>
      </Helmet>

      <Box paddingX="12" paddingY="10">
        <Heading as="h1">{children}</Heading>
      </Box>
    </>
  )
}

function PageContent({ children }: PageContentProps) {
  return (
    <Box paddingX="12" paddingY="10">
      {children}
    </Box>
  )
}

Page.Title = PageTitle
Page.Content = PageContent

export { Page }
