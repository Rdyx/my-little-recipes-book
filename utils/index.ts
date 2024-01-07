import slugify from 'slugify'
// import { parse, stringify } from 'zipson'

export const getSlug = (str: string) => slugify(str, { lower: true })

// Testing zipson
// export const testMe = () => stringify({ test: [{ ok: 'test' }] })
// export const testMeTwo = () => parse('{¨test¨|¦¨ok¨‡ß0þþþ^J7—÷}')
