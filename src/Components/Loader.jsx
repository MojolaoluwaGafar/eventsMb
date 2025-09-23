import React from 'react'
import { DotLoader } from "react-spinners"
import { motion } from "framer-motion"

export default function Loader({ height = "100vh", color = "#9747FF" , loading =true  }) {
  return (
    <motion.div  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
 style={{height}} className="flex mx-auto items-center justify-center">
        <DotLoader color={color} loading={loading} />
    </motion.div>
  )
}
