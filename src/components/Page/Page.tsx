import { Helmet } from 'react-helmet'
import { Heading } from 'src/components'

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
  return <div>{children}</div>
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <>
      <Helmet defer={false}>
        {/* TODO: Should probably convert this to a string or there is room for a bug here */}
        {/* TODO: Need to be able to handle page categories */}
        <title>{children} | Memories App</title>
      </Helmet>

      <Heading as="h1">{children}</Heading>
    </>
  )
}

function PageContent({ children }: PageContentProps) {
  return <div>{children}</div>
}

Page.Title = PageTitle
Page.Content = PageContent

export { Page }
