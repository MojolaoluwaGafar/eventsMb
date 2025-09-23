import React from 'react'

export default function Typography({content, className}) {
  return (
    <h1 className={`${className}`}>{content}</h1>
  )
}
