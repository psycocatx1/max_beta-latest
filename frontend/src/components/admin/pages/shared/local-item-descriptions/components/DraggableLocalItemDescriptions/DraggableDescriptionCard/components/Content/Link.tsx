import classes from '../../DraggableDescriptionCard.module.scss'

type LinkProps = {
  content: string;
}

export const Link = ({ content }: LinkProps) => (
  <div className={classes.card_link}>
    <a
      href={content}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.card_link_preview}
    >
      {content.length > 300
        ? `${content.substring(0, 300)}...`
        : content}
    </a>
  </div>
);