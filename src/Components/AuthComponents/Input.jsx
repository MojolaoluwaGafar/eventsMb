import React from 'react'

export default function Input({id,name,type,className,placeholder, onChange, value}){

    return(
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 ${className}`}
        onChange={onChange}
        value={value}
      />
    )
}