import React from 'react'
import { Form, Page } from 'src/components'
import { useAddMemoryPage } from 'src/hooks'

export function AddMemoryPage() {
  const [state, send] = useAddMemoryPage()

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      title: { value: string }
      summary: { value: string }
      recordedDate: { value: Date }
    }
    const title = target.title.value
    const summary = target.summary.value
    const recordedDate = new Date(target.recordedDate.value)

    return send({ type: 'SUBMIT', memory: { title, summary, recordedDate } })
  }

  return (
    <Page>
      <Page.Title>Add Memory</Page.Title>

      <Page.Content>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>

            <input type="text" name="title" id="title" disabled={state.matches('loading')} />
          </div>

          <div>
            <label htmlFor="summary">Summary</label>

            <textarea name="summary" id="summary" disabled={state.matches('loading')} />
          </div>

          <div>
            <label htmlFor="recorded-date">Memory Date</label>

            <input
              type="date"
              name="recordedDate"
              id="recorded-date"
              defaultValue={formatDate(new Date())}
              max={formatDate(new Date())}
              disabled={state.matches('loading')}
            />
          </div>

          <button type="submit" disabled={state.matches('loading')}>
            Add Memory
          </button>
        </Form>
      </Page.Content>
    </Page>
  )
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}
