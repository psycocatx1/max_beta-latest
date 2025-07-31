import classes from './Container.module.scss';
import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export const Container = ({ children, className, narrow }: ContainerProps) => (
  <div className={clsx(classes.container, narrow && classes.narrow, className)}>
    {children}
  </div>
);