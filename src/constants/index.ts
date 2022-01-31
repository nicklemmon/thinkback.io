import { Tag } from 'src/types'

export const TAG_OPTIONS: Tag[] = [{ name: 'aww' }, { name: 'funny' }, { name: 'firsts' }]

export const isDev = process.env.NODE_ENV === 'development'

export const isProd = process.env.NODE_ENV === 'production'

export const isTest = process.env.NODE_ENV === 'test'
