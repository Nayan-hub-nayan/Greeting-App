'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FireRocket from './components/FireRocket'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function WishingApp() {
  const [event, setEvent] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [wishLink, setWishLink] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/wishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, name, description }),
    })
    const { id } = await response.json()
    setWishLink(`${window.location.origin}/wish/${id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Wishing App</CardTitle>
        </CardHeader>
        <CardContent>
          {!wishLink ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-2">
                <Input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="Enter event (e.g., Birthday, Anniversary)"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a personal message"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Create Wish
              </Button>
            </motion.form>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 text-lg">Your wish has been created! Share this link with {name}:</p>
              <Link 
                href={wishLink}
                className="text-primary hover:text-primary/90 break-all text-lg font-semibold"
              >
                {wishLink}
              </Link>
              <FireRocket />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

