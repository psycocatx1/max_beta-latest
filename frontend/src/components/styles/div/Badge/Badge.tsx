import classes from './Badge.module.scss';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant: 'info' | 'success' | 'warning' | 'error' | 'primary';
}

export const Badge = ({ children, className, variant }: BadgeProps) => {
  return <div className={clsx(classes.badge, classes[variant], className)}>{children}</div>;
};