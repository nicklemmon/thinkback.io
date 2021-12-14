import { useMachine } from '@xstate/react'
import { ApiAlert, Page } from 'src/components'
import { Button, Link, Tabs, TabList, TabPanels, Tab, TabPanel } from 'src/components/chakra'
import { memoriesPageMachine } from 'src/machines'
import { MemoriesGrid, MemoriesTable } from './components'

export function MemoriesPage() {
  const [state, send] = useMachine(memoriesPageMachine)

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
          <Tabs variant="enclosed" colorScheme="purple">
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
