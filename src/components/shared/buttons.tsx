import { VariantProps, cva } from 'class-variance-authority'
import { Anchor } from './anchor'

const buttonStyles = cva(
  'inline-block text-base tracking-wider font-semibold rounded-full transition ease-in duration-100 focus:outline-none focus:ring-2 focus:ring-white',
  {
    variants: {
      variant: {
        primary: ['bg-gradient-to-r from-orange to-[#FF7F2D] hover:bg-opacity-90 '],
        secondary: ['bg-white text-[#0E0E0E] hover:bg-opacity-90'],
        outline: ['ring-2 ring-white text-white hover:opacity-90 ring-inset'],
        white: ['ring-2 ring-white bg-white text-black hover:opacity-90 ring-inset'],
      },
      size: {
        normal: ['px-10 py-3'],
        medium: ['px-12 py-4'],
      },
      fullWidth: {
        true: ['w-full'],
      },
    },
    defaultVariants: {
      size: 'normal',
      variant: 'primary',
    },
  }
)

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, variant, size, fullWidth, ...otherProps } = props
  return (
    <button className={buttonStyles({ variant, className, size, fullWidth })} {...otherProps} />
  )
}

interface LinkButtonProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    VariantProps<typeof buttonStyles> {}

export const LinkButton: React.FC<LinkButtonProps> = ({
  className,
  variant,
  size,
  fullWidth,
  ...props
}) => <Anchor className={buttonStyles({ variant, className, size, fullWidth })} {...props} />
