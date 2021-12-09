import { HStack } from '@chakra-ui/layout'
import { useMachine } from '@xstate/react'
import { ApiAlert, Card, Page } from 'src/components'
import { Box, Button, Link, Grid, Tag, Text, VStack } from 'src/components/chakra'
import { formatDate } from 'src/helpers/date'
import { memoriesPageMachine } from 'src/machines'

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
          <Grid role="list" templateColumns="repeat(4, 1fr)" gap={6}>
            {state.context.memories.map(memory => {
              const kid = memory.get('kid')
              const date = formatDate(memory.get('recordedDate') as unknown as Date)

              return (
                <Box as={Card} key={memory.id} role="listitem" position="relative">
                  <Card.Header>
                    <Box width="100%" display="flex" justifyContent="space-between">
                      {kid ? <Tag colorScheme={kid.get('tagColor')}>{kid.get('name')}</Tag> : null}

                      <Text fontSize="sm" color="gray.500">
                        {date}
                      </Text>
                    </Box>
                  </Card.Header>

                  <Card.Content>
                    <VStack spacing={2}>
                      <Link to={`/memories/${memory.id}`}>{memory.get('title')}</Link>

                      {memory.get('summary') ? (
                        <Text as="p" fontSize="md" color="gray.500" noOfLines={2}>
                          {memory.get('summary')}
                        </Text>
                      ) : null}
                    </VStack>
                  </Card.Content>

                  <Card.Footer>
                    <HStack>
                      {memory.get('tags')?.map(tag => {
                        return <Tag key={`${memory.id}-${tag.name}`}>{tag.name}</Tag>
                      })}
                    </HStack>
                  </Card.Footer>
                </Box>
              )
            })}
          </Grid>
        ) : null}
      </Page.Content>
    </Page>
  )
}
