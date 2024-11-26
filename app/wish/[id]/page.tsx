'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useParams } from 'next/navigation'
import FireRocket from '@/components/FireRocket'
import { Card, CardContent } from "@/components/ui/card"

export default function WishPage() {
  const params = useParams()
  const [wish, setWish] = useState<{ event: string; name: string; description: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const response = await fetch(`/api/wishes?id=${params.id}`)
        const data = await response.json()
        setWish(data)
        if (data.event && data.name) {
          fireWorks()
        }
      } catch (error) {
        console.error('Error fetching wish:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWish()
  }, [params.id])

  const fireWorks = () => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }))
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }))
    }, 250)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl"
        >
          Wish not found
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative w-full max-w-4xl"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-none">
          <CardContent className="p-8 md:p-12 lg:p-16">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 sparkle-text"
            >
              Happy {wish.event}!
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-8 glow-text"
            >
              {wish.name}
            </motion.p>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl text-white mb-6 md:mb-8"
            >
              {wish.description}
            </motion.p>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-white"
            >
              Wishing you all the best on this special day!
            </motion.p>
          </CardContent>
        </Card>
        <FireRocket />
      </motion.div>
    </div>
  )
}

