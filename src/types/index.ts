export type Username = string

type RecordedDate = {
  __type: 'Date'
  iso: string
}

export type Tag = {
  name: string
}

export type Memory = {
  title: string
  recordedDate: RecordedDate
  createdAt: Date
  updatedAt: Date
  kid?: Parse.Object<Kid>
  summary?: string
  tags?: Tag[] | []
}

export type NewMemory = {
  title: string
  recordedDate: Date
  summary?: string
  kid?: Parse.Object<Kid>
  tags?: Tag[] | []
}

export type ApiResponse = any

export type ParseSuccessResponse = {
  results: Array<any> | Object | []
}

export type User = {
  createdAt: string
  email: string
  objectId: string
  sessionToken: string
  username: Username
  updatedAt?: string
}

export type Kid = {
  name: string
  objectId?: string
  createdAt?: string
  updatedAt?: string
  tagColor?: string
}

export type Toast = {
  message: string
  variant: 'success' | 'error'
  id?: string
}
