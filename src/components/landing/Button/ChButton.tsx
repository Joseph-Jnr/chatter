import React from 'react'

type Color = string | string[]

interface ChButtonProps {
  hasLeftIcon?: React.ReactNode
  hasRightIcon?: React.ReactNode
  color: Color
  variant?: 'filled' | 'light' | 'outline'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const ChButton = ({
  hasLeftIcon,
  hasRightIcon,
  color,
  variant = 'filled',
  children,
  className,
  onClick,
}: ChButtonProps) => {
  const isSolid = variant === 'filled'

  const buttonStyles = {
    background: isSolid
      ? Array.isArray(color)
        ? `linear-gradient(90deg, ${color.join(', ')})`
        : color
      : 'transparent',
    color: isSolid ? 'white' : Array.isArray(color) ? color[0] : color,
    border: isSolid
      ? 'none'
      : `1px solid ${Array.isArray(color) ? color[0] : color}`,
  }

  return (
    <button
      className={`py-2 px-5 flex items-center justify-center gap-1 rounded-full font-semibold ${className}`}
      style={buttonStyles}
      onClick={onClick}
    >
      {hasLeftIcon && <span className='mr-2'>{hasLeftIcon}</span>}
      {children}
      {hasRightIcon && <span className='ml-2'>{hasRightIcon}</span>}
    </button>
  )
}

export default ChButton
