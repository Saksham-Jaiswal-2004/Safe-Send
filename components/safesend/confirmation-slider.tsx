"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

interface ConfirmationSliderProps {
  onConfirm: () => void
  disabled?: boolean
}

export function ConfirmationSlider({ onConfirm, disabled = false }: ConfirmationSliderProps) {
  const [isSliding, setIsSliding] = useState(false)
  const [slidePosition, setSlidePosition] = useState(0)

  const handleMouseDown = () => {
    if (disabled) return
    setIsSliding(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding || disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const position = Math.min(Math.max(0, e.clientX - rect.left - 24), rect.width - 48)
    setSlidePosition(position)

    if (position >= rect.width - 60) {
      setIsSliding(false)
      onConfirm()
    }
  }

  const handleMouseUp = () => {
    setIsSliding(false)
    setSlidePosition(0)
  }

  return (
    <div
      className={`relative h-12 bg-muted rounded-full overflow-hidden cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground">
        Hold to Confirm Transaction
      </div>
      <div
        className="absolute top-1 left-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(${slidePosition}px)` }}
        onMouseDown={handleMouseDown}
      >
        {slidePosition > 200 ? (
          <Check className="h-5 w-5 text-primary-foreground" />
        ) : (
          <ArrowRight className="h-5 w-5 text-primary-foreground" />
        )}
      </div>
    </div>
  )
}
