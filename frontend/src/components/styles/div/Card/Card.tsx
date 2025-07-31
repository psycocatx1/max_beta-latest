import clsx from 'clsx';
import classes from './Card.module.scss';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  href?: string;
}

export const Card = ({ children, className, hoverable, href }: CardProps) => href ? (
  <a href={href} className={clsx(classes.card, hoverable && classes.hoverable, className)}>
    {children}
  </a>
) : (
  <div className={clsx(classes.card, hoverable && classes.hoverable, className)}>
    {children}
  </div>
);