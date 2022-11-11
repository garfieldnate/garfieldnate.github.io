import { SUPPORTED_LANGUAGES } from './config'

export { SUPPORTED_LANGUAGES }
export const SUPPORTED_LANGUAGE_CODES = Object.keys(SUPPORTED_LANGUAGES)
export type SupportedLang = keyof typeof SUPPORTED_LANGUAGES

/** matches the language portion of a page URL */
const langPathRegex = /\/[a-z]{2}-?[A-Z]{0,2}\//

/** Given a language-specific page path, return the path to the same page in a different language*/
export function pathForLanguage (pathname: string, newLang: SupportedLang) {
    if (!pathname.match(langPathRegex)) {
        throw new Error(`cannot find language in path ${pathname}`)
    }

    let pathWithoutLanguage = pathname.replace(langPathRegex, '/')
    return '/' + newLang + pathWithoutLanguage
}

/** If a translated text is a simple string, then it is the same for all supported languages */
export type TranslatedString = string | { [lang in SupportedLang]: string }
export const getTranslation = (text: TranslatedString, lang: SupportedLang): string => {
    if (typeof text === 'string') {
        return text
    }
    return text[lang]
}
