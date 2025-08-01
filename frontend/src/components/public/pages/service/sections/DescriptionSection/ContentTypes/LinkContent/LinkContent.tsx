import { Paragraph } from '@/components/styles';
import classes from './LinkContent.module.scss';

type LinkContentProps = {
  content: string;
  title: string | null;
}

export const LinkContent = ({ content, title }: LinkContentProps) => {
  return (
    <Paragraph
      size='md'
      href={content}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
    >
      {title || content}
    </Paragraph>
  );
}