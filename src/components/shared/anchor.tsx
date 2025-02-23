import React from 'react'
import { Link } from 'react-router-dom'

export const Anchor = ({
  href,
  ...props
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) =>
  href?.startsWith('http') ? (
    <a href={href} target="_blank" rel="noreferrer" {...props} />
  ) : (
    <Link to={href as string}>
      <span {...props} />
    </Link>
  )

export default Anchor
