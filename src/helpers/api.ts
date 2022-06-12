import Parse from 'parse'
import { ApiResponse, Kid, Memory, NewMemory, Username } from 'src/types'
import { getCurrentUser, getSessionToken } from './user'

export async function signUp(username: Username, email: string, password: string) {
  const user = new Parse.User()

  user.set('username', username)
  user.set('email', email)
  user.set('password', password)

  return user
    .signUp()
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}

export async function logIn(username: Username, password: string) {
  return Parse.User.logIn(username, password)
    .then(res => Promise.resolve(res))
    .catch(err => {
      console.error('logIn err:', err)

      return Promise.reject(err)
    })
}

export async function logOut() {
  return Parse.User.logOut()
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}

export async function getMemories() {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  query.limit(1000)

  return query
    .find({ sessionToken })
    .then(res => res)
    .catch(err => Promise.reject(err))
}

export async function getMemory(id: string) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  query.equalTo('objectId', id)

  return query
    .first({ sessionToken })
    .then(res => res)
    .catch(err => Promise.reject(err))
}

export async function updateMemory(memory: Memory) {
  const { title, summary, recordedDate, tags, kid } = memory
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  /* @ts-expect-error */
  return query.get(memory.id).then(object => {
    if (title) object.set('title', title)

    if (summary) object.set('summary', summary)

    if (recordedDate) object.set('recordedDate', recordedDate)

    if (tags) object.set('tags', tags)

    if (kid) object.set('kid', kid)

    return object
      .save({ sessionToken })
      .then(res => res)
      .catch(err => {
        return Promise.reject(err)
      })
  })
}

export async function createMemory(memory: NewMemory) {
  const { title, summary, tags, recordedDate, kid } = memory
  const Memory = Parse.Object.extend('memory')
  const object = new Memory()
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  object.set('title', title)
  object.set('summary', summary)
  object.set('tags', tags)
  object.set('recordedDate', recordedDate)
  object.set('kid', kid)
  object.setACL(currentUser)

  return object
    .save({ sessionToken })
    .then((res: ApiResponse) => res)
    .catch((err: any) => Promise.reject(err))
}

export async function deleteMemory(memoryId: string) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  return query
    .get(memoryId)
    .then(obj => obj.destroy({ sessionToken }))
    .catch(err => Promise.reject(err))
}

export async function getUser(userId: string) {
  const User = Parse.Object.extend('User')
  const query = new Parse.Query(User)

  return query
    .get(userId)
    .then(res => parseResponse(res))
    .catch(err => Promise.reject(err))
}

export async function getKid(id: string) {
  const Kid = Parse.Object.extend('Kid')
  const query = new Parse.Query(Kid)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  query.equalTo('objectId', id)

  return query
    .first({ sessionToken })
    .then(res => res)
    .catch(err => Promise.reject(err))
}

export async function getKids() {
  const KidClass = Parse.Object.extend('Kid')
  const query = new Parse.Query(KidClass)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  query.limit(1000)

  return query
    .find({ sessionToken })
    .then(res => res)
    .catch(err => Promise.reject(err))
}

export async function createKid(kid: Kid) {
  const { name, tagColor } = kid
  const Kid = Parse.Object.extend('Kid')
  const object = new Kid()
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  object.set('name', name)
  object.set('tagColor', tagColor)
  object.setACL(currentUser)

  return object
    .save({ sessionToken })
    .then((res: ApiResponse) => res)
    .catch((err: any) => err)
}

export async function deleteKid(kidId: string) {
  const Kid = Parse.Object.extend('Kid')
  const query = new Parse.Query(Kid)
  const currentUser = getCurrentUser()
  const sessionToken = getSessionToken(currentUser)

  return query
    .get(kidId)
    .then(obj => obj.destroy({ sessionToken }))
    .catch(err => Promise.reject(err))
}

function parseResponse(res: ApiResponse) {
  return JSON.parse(JSON.stringify(res))
}
