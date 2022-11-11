// Language dropdown selector; taken from Astro's example docs site (with slight changes):
// https://github.com/withastro/astro/blob/main/examples/docs/src/components/Header/LanguageSelect.tsx
// assumes that the language is indicated at the beginning of the URL path, e.g. /en/blog/...

/** @jsxImportSource react */
import { FunctionComponent } from 'react'
import './LanguageSelect.css'
import {
    SUPPORTED_LANGUAGES,
    SupportedLang,
    pathForLanguage
} from '../../languages'

const LanguageSelect: FunctionComponent<{ lang: string }> = ({ lang }) => {
    return (
        <div className='language-select-wrapper'>
            <svg
                aria-hidden='true'
                focusable='false'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 88.6 77.3'
                height='1.2em'
                width='1.2em'
            >
                <path
                    fill='currentColor'
                    d='M61,24.6h7.9l18.7,51.6h-7.7l-5.4-15.5H54.3l-5.6,15.5h-7.2L61,24.6z M72.6,55l-8-22.8L56.3,55H72.6z'
                />
                <path
                    fill='currentColor'
                    d='M53.6,60.6c-10-4-16-9-22-14c0,0,1.3,1.3,0,0c-6,5-20,13-20,13l-4-6c8-5,10-6,19-13c-2.1-1.9-12-13-13-19h8          c4,9,10,14,10,14c10-8,10-19,10-19h8c0,0-1,13-12,24l0,0c5,5,10,9,19,13L53.6,60.6z M1.6,16.6h56v-8h-23v-7h-9v7h-24V16.6z'
                />
            </svg>
            <select
                className='language-select'
                value={lang}
                onChange={e => {
                    const newLang = e.target.value as SupportedLang
                    window.location.pathname = pathForLanguage(
                        window.location.pathname,
                        newLang
                    )
                }}
            >
                {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => {
                    return (
                        <option value={key} key={key}>
                            {value}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default LanguageSelect
