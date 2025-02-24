import { FC, useState, useEffect } from 'react'

const greetings = [
  { text: "Hello", language: "English" },
  { text: "你好", language: "Chinese" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Hola", language: "Spanish" },
  { text: "Bonjour", language: "French" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "مرحبا", language: "Arabic" }
]

const RotatingGreeting: FC = () => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const currentWord = greetings[index].text
    const isComplete = !isDeleting && text === currentWord
    const isDeletingComplete = isDeleting && text === ''

    if (isComplete) {
      // Wait a bit before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 1500)
    } else if (isDeletingComplete) {
      // Move to next word
      setIsDeleting(false)
      setIndex((current) => (current + 1) % greetings.length)
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? text.slice(0, -1)
          : currentWord.slice(0, text.length + 1)
        setText(nextText)
      }, isDeleting ? 50 : 150) // Delete faster than type
    }

    return () => clearTimeout(timeout)
  }, [index, text, isDeleting])

  return (
    <h1 className="greeting-title">
      {text}
      <span className="cursor"></span>
    </h1>
  )
}

export default RotatingGreeting 