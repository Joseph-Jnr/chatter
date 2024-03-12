import React from 'react'

type Color = string | string[]

interface ChButtonProps {
  hasLeftIcon?: React.ReactNode
  hasRightIcon?: React.ReactNode
  color: Color
  variant?: 'filled' | 'light' | 'outline'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

const ChButton = ({
  hasLeftIcon,
  hasRightIcon,
  color,
  variant = 'filled',
  children,
  className,
  type,
  disabled,
  onClick,
}: ChButtonProps) => {
  const isSolid = variant === 'filled'

  const buttonColor = isSolid
    ? disabled
      ? 'rgba(255, 255, 255, 0.5)' // Solid and disabled (opaque white)
      : Array.isArray(color)
      ? color[0]
      : color
    : disabled
    ? 'rgba(255, 255, 255, 0.5)' // Not solid but disabled (opaque white)
    : 'white' // Not solid and not disabled

  const buttonStyles = {
    background: isSolid
      ? Array.isArray(color)
        ? `linear-gradient(90deg, ${color.join(', ')})`
        : color
      : 'transparent',
    //color: isSolid ? 'white' : Array.isArray(color) ? color[0] : color,
    color: isSolid && !disabled ? 'white' : buttonColor,
    border: isSolid
      ? 'none'
      : `1px solid ${Array.isArray(color) ? color[0] : color}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <button
      disabled={disabled}
      type={type}
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
