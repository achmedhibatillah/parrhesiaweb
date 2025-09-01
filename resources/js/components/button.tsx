function ATag({ link, target, children, style, onClick, disabled }: any) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={link}
      target={target || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

function ButtonTag({ type = 'button', children, style, onClick, disabled, onMouseDown }: any) {
  return (
    <button
      type={type}
      className={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function Button({
  className,
  tag = 'button',
  link = '#',
  target = '',
  type = 'button',
  children,
  onClick,
  disabled = false,
  onMouseDown
}: any) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-300 ease-in-out px-3 py-1';
  const finalStyle = `${className || ''} ${baseStyle} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`.trim();

  if (tag === 'a') {
    return (
      <ATag link={link} target={target} style={finalStyle} onClick={onClick} disabled={disabled}>
        {children}
      </ATag>
    );
  }

  return (
    <ButtonTag type={type} style={`${finalStyle} ${disabled ? 'bg-gray-300 hover:bg-gray-300' : '' }`} onClick={onClick} disabled={disabled} onMouseDown={onMouseDown}>
      {children}
    </ButtonTag>
  );
}
