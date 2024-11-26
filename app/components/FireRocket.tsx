import { motion } from 'framer-motion'

const FireRocket = () => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '-120%' }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-32 lg:w-40"
    >
      <svg viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M20 0L40 60H0L20 0Z"
          fill="url(#rocket-gradient)"
          animate={{
            fill: ['#FF4D4D', '#FFD700', '#FF4D4D'],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.path
          d="M10 60L20 100L30 60H10Z"
          fill="url(#flame-gradient)"
          animate={{
            fill: ['#FF4D4D', '#FFD700', '#FF4D4D'],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <defs>
          <linearGradient id="rocket-gradient" x1="20" y1="0" x2="20" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4D4D" />
            <stop offset="1" stopColor="#FF9900" />
          </linearGradient>
          <linearGradient id="flame-gradient" x1="20" y1="60" x2="20" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9900" />
            <stop offset="1" stopColor="#FF4D4D" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export default FireRocket