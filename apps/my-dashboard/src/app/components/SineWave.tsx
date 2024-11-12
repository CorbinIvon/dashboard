'use client'
import React, { useEffect, useRef } from 'react'

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let animationFrameId: number
    const width = canvas.width
    const height = canvas.height
    const amplitude = height / 2.5
    const frequency = (6 * Math.PI) / width
    let time = 0

    const draw = () => {
      context.clearRect(0, 0, width, height)

      // Draw x-axis and y-axis
      context.beginPath()
      context.moveTo(0, height / 2)
      context.lineTo(width, height / 2)
      context.moveTo(width / 2, 0)
      context.lineTo(width / 2, height)
      context.stroke()

      // Draw sine wave
      context.beginPath()
      context.moveTo(0, height / 2)
      for (let x = 0; x < width; x++) {
        const y = height / 2 + amplitude * Math.sin(frequency * (x + time - width / 2))
        context.lineTo(x, y)
      }
      context.strokeStyle = 'blue'
      context.stroke()
      time += 1

      // Draw border
      context.strokeStyle = 'white'
      context.lineWidth = 2
      context.strokeRect(0, 0, width, height)

      // Draw x-axis and y-axis labels
      context.font = '12px Arial'
      context.fillStyle = 'white'
      context.fillText('3π', width - 30, height / 2 + 20)
      context.fillText('-3π', 10, height / 2 + 20)
      context.fillText('1', width / 2 + 10, 20)
      context.fillText('-1', width / 2 + 10, height - 10)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} />
}

export default SineWave
