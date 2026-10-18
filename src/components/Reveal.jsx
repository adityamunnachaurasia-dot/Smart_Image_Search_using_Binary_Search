import { useReveal } from '../hooks/useReveal.js';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}