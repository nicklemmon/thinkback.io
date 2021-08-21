import Parse, { User } from 'parse'

// TODO: Unclear about the return type here - `User` doesn't quite align with the API docs
export function getCurrentUser(): User | undefined {
  return Parse.User.current()
}
