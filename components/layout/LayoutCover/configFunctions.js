import React, { useState, useEffect } from 'react'

export const randomColor = () => {
  const colors = ['bg-blue-300', 'bg-blue-500', 'bg-blue-800']
  const [currentColor, setCurrentColor] = useState(colors[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = colors.indexOf(currentColor)
      const nextIndex = (currentIndex + 1) % colors.length
      setCurrentColor(colors[nextIndex])
    }, 4000)

    return () => clearInterval(interval)
  }, [currentColor, colors])

  return currentColor
}
