import Parse from 'parse'
import { ApiResponse, Kid, Memory, Username } from 'src/types'
import { getCurrentUser } from './user'

export function signUp(username: Username, email: string, password: string) {
  const user = new Parse.User()

  user.set('username', username)
  user.set('email', email)
  user.set('password', password)

  return user
    .signUp()
    .then(res => res)
    .catch(err => err)
}

export function logIn(username: Username, password: string) {
  return Parse.User.logIn(username, password)
    .then(res => res)
    .catch(err => err)
}

export function logOut() {
  return Parse.User.logOut()
    .then(res => res)
    .catch(err => err)
}

export function getMemories() {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  const currentUser = getCurrentUser()
  const sessionToken = currentUser?.get('sessionToken')

  query.limit(1000)

  return query
    .find({ sessionToken })
    .then(res => parseResponse(res))
    .catch(err => err)
}

export function getMemory(id: string) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  query.equalTo('objectId', id)

  return query
    .first()
    .then(res => parseResponse(res))
    .catch(err => err)
}

export function updateMemory(memory: Memory) {
  const { title, summary, recordedDate, tags } = memory
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memory.objectId).then(object => {
    if (title) object.set('title', title)
    if (summary) object.set('summary', summary)
    if (recordedDate) object.set('recordedDate', recordedDate)
    if (tags) object.set('tags', tags)

    return object
      .save()
      .then(res => res)
      .catch(err => err)
  })
}

export function createMemory(memory: Memory) {
  const { title, summary, tags, recordedDate } = memory
  const Memory = Parse.Object.extend('memory')
  const object = new Memory()
  const currentUser = getCurrentUser()

  object.set('title', title)
  object.set('summary', summary)
  object.set('tags', tags)
  object.set('recordedDate', recordedDate)
  object.setACL(currentUser)

  return object
    .save()
    .then((res: ApiResponse) => res)
    .catch((err: any) => err)
}

export function deleteMemory(memoryId: string) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query
    .get(memoryId)
    .then(obj => obj.destroy())
    .catch(err => err)
}

export function getUser(userId: string) {
  const User = Parse.Object.extend('User')
  const query = new Parse.Query(User)

  return query
    .get(userId)
    .then(res => parseResponse(res))
    .catch(err => err)
}

function parseResponse(res: ApiResponse) {
  return JSON.parse(JSON.stringify(res))
}

export function getKids() {
  const KidClass = Parse.Object.extend('Kid')
  const query = new Parse.Query(KidClass)
  const currentUser = getCurrentUser()
  const sessionToken = currentUser?.get('sessionToken')

  query.limit(1000)

  return query
    .find({ sessionToken })
    .then(res => parseResponse(res))
    .catch(err => err)
}

export function createKid(kid: Kid) {
  const { name } = kid
  const Kid = Parse.Object.extend('Kid')
  const object = new Kid()
  const currentUser = getCurrentUser()

  object.set('name', name)
  object.setACL(currentUser)

  return object
    .save()
    .then((res: ApiResponse) => res)
    .catch((err: any) => err)
}
