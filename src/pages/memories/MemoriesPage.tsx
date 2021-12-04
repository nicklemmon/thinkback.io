import { HStack } from '@chakra-ui/layout'
import { useMachine } from '@xstate/react'
import { Card, Page } from 'src/components'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Link,
  Grid,
  Spinner,
  Tag,
  Text,
  VStack,
} from 'src/components/chakra'
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
        {state.matches('loading') && <Spinner />}

        {state.matches('error') && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Memories failed to load</AlertTitle>
            <AlertDescription>
              Please <button onClick={() => send('RETRY')}>try again</button>.
            </AlertDescription>
          </Alert>
        )}

        {state.matches('success') ? (
          <Grid role="list" templateColumns="repeat(4, 1fr)" gap={6}>
            {state.context.memories.map(memory => {
              // TODO: Some sort of impossible state here on page refresh - data isn't always available
              const kid = memory.get('kid')?.get('name')
              const date = formatDate(memory.get('recordedDate') as unknown as Date)

              return (
                <Box
                  as={Card}
                  key={memory.id}
                  role="listitem"
                  width="100%"
                  position="relative"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="unset"
                >
                  <Box p={4}>
                    <VStack>
                      <Link to={`/memories/${memory.id}`}>{memory.get('title')}</Link>

                      <HStack>
                        <Text fontSize="md" color="purple.800">
                          {date}
                        </Text>

                        {kid ? <Tag colorScheme="teal">{kid}</Tag> : null}
                      </HStack>

                      {memory.get('summary') ? (
                        <Text as="p" fontSize="md" color="gray.600" noOfLines={2}>
                          {memory.get('summary')}
                        </Text>
                      ) : null}
                    </VStack>
                  </Box>

                  <Box p={4}>
                    <HStack>
                      {memory.get('tags')?.map(tag => {
                        return <Tag key={`${memory.id}-${tag.name}`}>{tag.name}</Tag>
                      })}
                    </HStack>
                  </Box>
                </Box>
              )
            })}
          </Grid>
        ) : null}
      </Page.Content>
    </Page>
  )
}
