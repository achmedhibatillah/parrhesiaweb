import React from 'react'

function ATag({ link, target, children, style }) {
  return (
    <a
      href={link}
      target={target || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`${style} rounded px-2 py-1 transition-colors`}
    >
      {children}
    </a>
  )
}

function ButtonTag({ type = 'button', children, style }) {
  return (
    <button type={type} className={`${style} rounded px-2 py-1 transition-colors`}>
      {children}
    </button>
  )
}

export default function Button({
  tag = 'button',
  link = '#',
  target = '',
  type = 'button',
  style = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2 bg-blue-500 text-white hover:bg-blue-600',
  children,
}) {
  if (tag === 'a') {
    return (
      <ATag link={link} target={target} style={style}>
        {children}
      </ATag>
    )
  }

  return (
    <ButtonTag type={type} style={style}>
      {children}
    </ButtonTag>
  )
}
