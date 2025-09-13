import clsx from 'clsx';
import classes from './Section.module.scss';

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}

export const Section = ({ children, className, hero }: SectionProps) => (
  <section className={clsx(classes.section, hero && classes.hero, className)}>
    {children}
  </section>
);