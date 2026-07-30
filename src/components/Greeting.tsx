import { FC, useEffect, useState } from 'react'
import { NAME } from '../site'

const greetings = [
  { text: 'Hello', language: 'English' },
  { text: '你好', language: 'Mandarin' },
  { text: 'こんにちは', language: 'Japanese' },
  { text: '안녕하세요', language: 'Korean' },
  { text: 'नमस्ते', language: 'Hindi' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Hola', language: 'Spanish' },
  { text: 'Ciao', language: 'Italian' },
  { text: 'Olá', language: 'Portuguese' },
  { text: 'Hallo', language: 'German' },
  { text: 'مرحبا', language: 'Arabic' },
  { text: 'Привет', language: 'Russian' },
]

const HOLD_MS = 2400
const LEAVE_MS = 500
const STAGGER_MS = 45
const NBSP = ' '

const Greeting: FC = () => {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), HOLD_MS)
    return () => clearTimeout(timer)
  }, [index])

  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => {
      setLeaving(false)
      setIndex((current) => (current + 1) % greetings.length)
    }, LEAVE_MS)
    return () => clearTimeout(timer)
  }, [leaving])

  const greeting = greetings[index]
  const characters = Array.from(greeting.text)

  return (
    <header className="greeting">
      <h1 className="greeting-word">
        <span className="sr-only">Hello, I&rsquo;m {NAME}</span>
        <span aria-hidden="true">
          {characters.map((character, position) => (
            <span
              key={`${index}-${position}`}
              className={leaving ? 'greeting-char is-leaving' : 'greeting-char'}
              style={{
                animationDelay: `${
                  (leaving ? characters.length - 1 - position : position) * STAGGER_MS
                }ms`,
              }}
            >
              {character === ' ' ? NBSP : character}
            </span>
          ))}
        </span>
      </h1>
      <p className="greeting-language" aria-hidden="true">
        <span key={index} className={leaving ? 'is-leaving' : undefined}>
          {greeting.language}
        </span>
      </p>
    </header>
  )
}

export default Greeting
