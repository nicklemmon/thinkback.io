import { useMachine } from '@xstate/react'
import { ChangeEvent } from 'react'
import { Link, Form, Page, Toast } from 'src/components'
import { addKidPageMachine } from 'src/machines'

export function AddKidPage() {
  const [state, send] = useMachine(addKidPageMachine)

  function handleSubmit() {
    return send({ type: 'SUBMIT' })
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    return send({ type: 'NAME_CHANGE', name: e.target.value })
  }

  return (
    <Page>
      <Page.Title>Add a Kid</Page.Title>

      <Link to="/kids">Back to Kids</Link>

      {state.matches('success') && <Toast message="New kid successfully added" variant="success" />}

      {state.matches('error') && <p>Failed to add kid, whatever</p>}

      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first-name">First Name</label>

          <input
            type="text"
            name="name"
            id="first-name"
            onChange={handleNameChange}
            value={state.context.kid.name}
            disabled={state.matches('loading')}
          />
        </div>

        <button type="submit" disabled={state.matches('loading')}>
          Add Kid
        </button>
      </Form>
    </Page>
  )
}
