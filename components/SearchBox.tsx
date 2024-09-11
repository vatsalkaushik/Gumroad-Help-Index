import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useRef } from "react"

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder="Click / to search articles and replies"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  )
}