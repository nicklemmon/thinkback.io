import {
  Link,
  HStack,
  Table,
  Text,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tag,
  VisuallyHidden,
} from 'src/components/chakra'
import { formatDate } from 'src/helpers/date'
import { Memory } from 'src/types'

export function MemoriesTable({ memories }: { memories: Parse.Object<Memory>[] | [] }) {
  return (
    <Table>
      <caption>
        <VisuallyHidden>Memories</VisuallyHidden>
      </caption>

      <Thead>
        <Tr>
          <Th>Date</Th>

          <Th>Kid</Th>

          <Th>Name</Th>

          <Th>Summary</Th>

          <Th>Tags</Th>
        </Tr>
      </Thead>

      <Tbody>
        {memories.map((memory: Parse.Object<Memory>) => {
          const kid = memory.get('kid')
          const date = formatDate(memory.get('recordedDate') as unknown as Date)

          return (
            <Tr key={memory.id}>
              <Td>{date}</Td>

              <Td>
                <HStack>
                  {kid ? <Tag colorScheme={kid.get('tagColor')}>{kid.get('name')}</Tag> : null}
                </HStack>
              </Td>

              <Td>
                <Link to={`/memories/${memory.id}`}>{memory.get('title')}</Link>
              </Td>

              <Td>
                <Text as="p" fontSize="md" color="gray.500" isTruncated maxW="sm">
                  {memory.get('summary')}
                </Text>
              </Td>

              <Td>
                <HStack>
                  {memory.get('tags')?.map(tag => {
                    return <Tag key={`${memory.id}-${tag.name}`}>{tag.name}</Tag>
                  })}
                </HStack>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
