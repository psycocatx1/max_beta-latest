import classes from './SectionLoader.module.scss';

export const SectionLoader = () => {
  return (
    <div className={classes.section_loader}>
      <div className={classes.section_loader__spinner} />
    </div>
  );
}; 