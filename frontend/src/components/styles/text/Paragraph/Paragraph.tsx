import { ReactNode } from 'react';
import clsx from 'clsx';
import classes from './Paragraph.module.scss';
import Link from 'next/link';

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
  className?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  target?: string;
  rel?: string;
}

export const Paragraph = ({ children, className, size = 'md', href, target, rel, ...props }: ParagraphProps) => href ? (
  <Link className={clsx(classes[size], className)} href={href} target={target} rel={rel}>
    {children}
  </Link>
) : (
  <p className={clsx(classes[size], className)} {...props}>
    {children}
  </p>
);