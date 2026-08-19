import React from 'react'
import { Link } from 'wouter'

export default function ButtonComponent ({children, href, size = 'jkhdfgsjkfghsdsjkldfgdljk'}) {
  return href
    ? <Link size={size} href={href}>{children}</Link>
    : <Button size={size}>{children}</Button>
}