import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Card = forwardRef(({ 
  className,
  children,
  hover = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white shadow-card border border-gray-100",
        hover && "hover:shadow-card-hover transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card