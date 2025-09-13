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
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

export const Paragraph = ({ children, className, size = 'md', href, target, rel, dangerouslySetInnerHTML, ...props }: ParagraphProps) => href ? (
  <Link className={clsx(classes[size], className)} href={href} target={target} rel={rel}>
    {dangerouslySetInnerHTML ? null : children}
  </Link>
) : (
  <p className={clsx(classes[size], className)} dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props}>
    {dangerouslySetInnerHTML ? null : children}
  </p>
);