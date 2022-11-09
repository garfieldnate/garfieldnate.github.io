const SUPPORTED_LANGS = {
    en: 'Engish',
    ja: '日本語',
    de: 'Deutsch'
} as const

export type SupportedLang = keyof typeof SUPPORTED_LANGS
