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
  return <h1>{children}</h1>
}

function PageContent({ children }: PageContentProps) {
  return <div>{children}</div>
}

Page.Title = PageTitle
Page.Content = PageContent

export { Page }
