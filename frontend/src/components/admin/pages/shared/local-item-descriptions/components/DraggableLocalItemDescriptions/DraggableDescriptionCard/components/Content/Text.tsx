import classes from '../../DraggableDescriptionCard.module.scss'

export const Text = ({ content }: { content: string }) => (
  <div className={classes.card_text}>
    {content.length > 300
      ? `${content.substring(0, 300)}...`
      : content}
  </div>
);