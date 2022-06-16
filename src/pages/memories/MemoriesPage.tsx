import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { matchSorter } from 'match-sorter'
import { ApiAlert, Form, Page } from 'src/components'
import {
  Box,
  Button,
  Link,
  Tabs,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Select,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
} from 'src/components/chakra'
import type { Memory } from 'src/types'
import { useMemoriesPage, useQuery } from 'src/hooks'
import { MemoriesGrid, MemoriesTable } from './components'

const VIEW_INDICES = ['grid', 'table']

type MemoriesPageRouteParams = {
  view?: string
}

export function MemoriesPage() {
  const { view } = useParams<MemoriesPageRouteParams>()
  const queryParams = useQuery()
  const searchedFilterBy = queryParams.get('filterBy')
  const searchedKidId = queryParams.get('kidId')
  const [state, send] = useMemoriesPage()
  const activeTab = view === 'grid' ? 0 : 1
  const filteredMemories = matchSorter(
    state.context.memories,
    searchedFilterBy ? searchedFilterBy : '',
    {
      keys: [memory => memory.get('title')],
      baseSort: (a, b) => {
        /* @ts-expect-error */
        return new Date(b.item.get('recordedDate')) - new Date(a.item.get('recordedDate'))
      },
    },
    // eslint-disable-next-line
  ).filter((memory: Parse.Object<Memory>) => {
    // Return everything when "all" selected
    if (!searchedKidId || searchedKidId === 'all') return memory

    // Otherwise, return the memories with matching kid pointers
    if (memory.get('kid')?.id === searchedKidId) {
      return memory
    }
  })

  const handleTabsChange = (index: number) => {
    const view = VIEW_INDICES[index]

    /* @ts-expect-error */
    return send({ type: 'CHANGE_VIEW', view })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      filterBy: { value: string }
      kidId: { value: string }
    }

    const filterBy = target.filterBy.value
    const kidId = target.kidId.value

    return send({ type: 'FILTER_SUBMIT', filterBy, kidId })
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
        {state.matches('error') ? (
          <ApiAlert title="Memories failed to load" onRetry={() => send('RETRY')} />
        ) : null}

        {state.matches('confirmingDeletion') || state.matches('deleting') ? (
          <Modal isOpen onClose={() => send('CANCEL_DELETION')}>
            <ModalHeader>Delete Memory</ModalHeader>

            <ModalBody>
              <p>
                Are you sure you want to delete{' '}
                <strong>{state.context.memoryToDelete?.get('title')}</strong>?
              </p>
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button
                  level="destructive-primary"
                  onClick={() =>
                    send({ type: 'CONFIRM_DELETION', memory: state.context.memoryToDelete! })
                  }
                  isLoading={state.matches('deleting')}
                >
                  Delete
                </Button>

                <Button
                  level="destructive-secondary"
                  onClick={() => send('CANCEL_DELETION')}
                  isDisabled={state.matches('deleting')}
                >
                  Cancel
                </Button>
              </HStack>
            </ModalFooter>
          </Modal>
        ) : null}

        <VStack>
          <Form onSubmit={handleSubmit}>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={{ base: 2, md: 6 }}>
              <GridItem>
                <FormControl id="memory-filter-by">
                  <FormLabel htmlFor="memory-filter-by">Filter by</FormLabel>

                  <Input
                    name="filterBy"
                    autoComplete="off"
                    isDisabled={state.matches('loading')}
                    defaultValue={searchedFilterBy ? searchedFilterBy : ''}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl id="memory-kid-id">
                  <FormLabel htmlFor="memory-kid-id">Kid</FormLabel>

                  <Select
                    name="kidId"
                    defaultValue={searchedKidId ? searchedKidId : 'all'}
                    isDisabled={state.matches('loading')}
                  >
                    <option value="all">All Kids</option>

                    {state.context.kids?.map(kid => {
                      return (
                        <option key={kid.id} value={kid.id}>
                          {kid.get('name')}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                {/* Just to ensure the button is aligned consistently with other form fields */}
                <FormLabel role="presentation">
                  <Box opacity="0">Spacer</Box>
                </FormLabel>

                <HStack>
                  <Button level="secondary" type="submit" isDisabled={state.matches('loading')}>
                    Apply Filters
                  </Button>

                  {searchedFilterBy || searchedKidId ? (
                    <Button
                      level="tertiary"
                      onClick={() => send('CLEAR_FILTERS')}
                      isDisabled={state.matches('loading')}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
                </HStack>
              </GridItem>
            </Grid>
          </Form>

          {state.matches('loading') ? <Page.Loader /> : null}

          <Tabs
            variant="enclosed"
            colorScheme="purple"
            index={activeTab}
            onChange={handleTabsChange}
            width="100%"
          >
            <TabList>
              <Tab isDisabled={state.matches('loading')}>Grid View</Tab>

              <Tab isDisabled={state.matches('loading')}>Table View</Tab>
            </TabList>

            {state.matches('idle') ||
            state.matches('confirmingDeletion') ||
            state.matches('deleting') ? (
              <TabPanels>
                <TabPanel padding="0" paddingTop="6">
                  {filteredMemories.length === 0 ? (
                    <p>No memories found</p>
                  ) : (
                    <MemoriesGrid
                      memories={filteredMemories}
                      onDeleteClick={(memory: Parse.Object<Memory>) =>
                        send({ type: 'DELETE', memory })
                      }
                    />
                  )}
                </TabPanel>

                <TabPanel padding="0" paddingTop="6">
                  {filteredMemories.length === 0 ? (
                    <p>No memories found</p>
                  ) : (
                    <MemoriesTable memories={filteredMemories} />
                  )}
                </TabPanel>
              </TabPanels>
            ) : null}
          </Tabs>
        </VStack>
      </Page.Content>
    </Page>
  )
}
