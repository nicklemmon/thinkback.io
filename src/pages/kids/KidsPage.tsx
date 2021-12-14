import { useMachine } from '@xstate/react'
import { ApiAlert, Page } from 'src/components'
import {
  Button,
  Link,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tag,
  VisuallyHidden,
} from 'src/components/chakra'
import { kidsPageMachine } from 'src/machines/kidsPageMachine'

export function KidsPage() {
  const [state, send] = useMachine(kidsPageMachine)

  return (
    <Page>
      <Page.Header>
        <Page.Title>Kids</Page.Title>

        <Button level="primary" as={Link} to="/kids/add">
          Add a Kid
        </Button>
      </Page.Header>

      {state.matches('loading') ? <Page.Loader /> : null}

      <Page.Content>
        {state.matches('error') ? (
          <ApiAlert title="Kids failed to load" onRetry={() => send({ type: 'RETRY' })} />
        ) : null}

        {state.matches('success') ? (
          <Table>
            <caption>
              <VisuallyHidden>Kids</VisuallyHidden>
            </caption>

            <Thead>
              <Tr>
                <Th>Name</Th>

                <Th>Tag Color</Th>
              </Tr>
            </Thead>

            <Tbody>
              {state.context.kids.map(kid => {
                return (
                  <Tr key={kid.id}>
                    <Td>
                      <Link to={`/kids/${kid.id}`}>{kid.get('name')}</Link>
                    </Td>

                    <Td>
                      <Tag colorScheme={kid.get('tagColor')}>{kid.get('tagColor')}</Tag>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        ) : null}
      </Page.Content>
    </Page>
  )
}
