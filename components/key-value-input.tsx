"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface KeyValueInputProps {
  keyValue: string
  valueValue: string
  onKeyChange: (value: string) => void
  onValueChange: (value: string) => void
  onRemove: () => void
}

export function KeyValueInput({ keyValue, valueValue, onKeyChange, onValueChange, onRemove }: KeyValueInputProps) {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Key" value={keyValue} onChange={(e) => onKeyChange(e.target.value)} className="flex-1" />
      <Input
        placeholder="Value"
        value={valueValue}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex-1"
      />
      <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

