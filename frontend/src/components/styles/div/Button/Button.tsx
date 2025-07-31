import clsx from 'clsx';
import classes from './Button.module.scss';
import Link from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'white';
  href?: string;
}

export const Button = ({ children, className, variant = 'primary', href, ...props }: ButtonProps) => href ? (
  <Link href={href} className={clsx(classes.button, classes[variant], className)}>
    {children}
  </Link>
) : (
  <button className={clsx(classes.button, classes[variant], className)} {...props}>
    {children}
  </button>
);