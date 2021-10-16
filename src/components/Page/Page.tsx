import { Helmet } from 'react-helmet'

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
        <title>{children} | Memories App</title>
      </Helmet>

      <h1>{children}</h1>
    </>
  )
}

function PageContent({ children }: PageContentProps) {
  return <div>{children}</div>
}

Page.Title = PageTitle
Page.Content = PageContent

export { Page }
