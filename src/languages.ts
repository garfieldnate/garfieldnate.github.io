import { SUPPORTED_LANGUAGES } from './config'

export { SUPPORTED_LANGUAGES }
export const SUPPORTED_LANGUAGE_CODES = Object.keys(SUPPORTED_LANGUAGES)
export type SupportedLang = keyof typeof SUPPORTED_LANGUAGES

/** matches the language portion of a page URL */
const langPathRegex = /\/[a-z]{2}-?[A-Z]{0,2}\//

/** Given a language-specific page path, return the path to the same page in a different language*/
export function pathForLanguage(pathname: string, newLang: SupportedLang) {
    if (!pathname.match(langPathRegex)) {
        throw new Error(`cannot find language in path ${pathname}`)
    }

    let pathWithoutLanguage = pathname.replace(langPathRegex, '/')
    return  '/' + newLang + pathWithoutLanguage
}
