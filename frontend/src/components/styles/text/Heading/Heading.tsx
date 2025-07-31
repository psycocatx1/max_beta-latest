import { ReactNode } from 'react';
import clsx from 'clsx';
import classes from './Heading.module.scss';

type HeadingProps = {
  children: ReactNode;
  className?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export const Heading = ({ children, className, size }: HeadingProps) => {
  switch (size) {
    case 'sm':
      return <h5 className={clsx(classes.sm, className)}>{children}</h5>;
    case 'md':
      return <h4 className={clsx(classes.md, className)}>{children}</h4>;
    case 'lg':
      return <h3 className={clsx(classes.lg, className)}>{children}</h3>;
    case 'xl':
      return <h2 className={clsx(classes.xl, className)}>{children}</h2>;
  }
};