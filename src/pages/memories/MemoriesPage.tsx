import { useParams } from 'react-router-dom'
import { ApiAlert, Page } from 'src/components'
import { Button, Link, Tabs, TabList, TabPanels, Tab, TabPanel } from 'src/components/chakra'
import { useMemoriesPage } from 'src/hooks'
import { MemoriesGrid, MemoriesTable } from './components'

const VIEW_INDICES = ['grid', 'table']

type MemoriesPageRouteParams = {
  view?: string
}

export function MemoriesPage() {
  const { view } = useParams<MemoriesPageRouteParams>()
  const [state, send] = useMemoriesPage()
  const activeTab = view === 'grid' ? 0 : 1

  const handleTabsChange = (index: number) => {
    const view = VIEW_INDICES[index]

    /* @ts-expect-error */
    return send({ type: 'CHANGE_VIEW', view })
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title>Memories</Page.Title>

        <Button level="primary" as={Link} to="/memories/add">
          Add a Memory
        </Button>
      </Page.Header>

      <Page.Content>
        {state.matches('loading') ? <Page.Loader /> : null}

        {state.matches('error') ? (
          <ApiAlert title="Memories failed to load" onRetry={() => send('RETRY')} />
        ) : null}

        {state.matches('success') ? (
          <Tabs
            variant="enclosed"
            colorScheme="purple"
            index={activeTab}
            onChange={handleTabsChange}
          >
            <TabList>
              <Tab>Grid View</Tab>

              <Tab>Table View</Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding="0" paddingTop="6">
                <MemoriesGrid memories={state.context.memories} />
              </TabPanel>

              <TabPanel padding="0" paddingTop="6">
                <MemoriesTable memories={state.context.memories} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : null}
      </Page.Content>
    </Page>
  )
}
