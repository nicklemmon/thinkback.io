import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Link, Grid, HStack, IconButton, Tag, Text, VStack } from 'src/components/chakra'
import { Card } from 'src/components'
import { Memory } from 'src/types'
import { formatDate } from 'src/helpers/date'

export function MemoriesGrid({
  memories,
  onDeleteClick,
}: {
  memories: Parse.Object<Memory>[] | []
  onDeleteClick: (memory: Parse.Object<Memory>) => void
}) {
  return (
    <Grid
      role="list"
      templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
      gap={6}
    >
      {memories.map((memory: Parse.Object<Memory>) => {
        const kid = memory.get('kid')
        const date = formatDate(memory.get('recordedDate') as unknown as Date)

        return (
          <Box
            as={Card}
            key={memory.id}
            role="listitem"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {/* `div` here to help with flex layout */}
            <div>
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
            </div>

            <Card.Footer>
              <Box display="flex" justifyContent="space-between">
                <HStack>
                  {memory.get('tags')?.map(tag => {
                    return <Tag key={`${memory.id}-${tag.name}`}>{tag.name}</Tag>
                  })}
                </HStack>

                <IconButton
                  aria-label="Delete memory"
                  colorScheme="purple"
                  variant="ghost"
                  onClick={() => onDeleteClick(memory)}
                  icon={<DeleteIcon />}
                />
              </Box>
            </Card.Footer>
          </Box>
        )
      })}
    </Grid>
  )
}
