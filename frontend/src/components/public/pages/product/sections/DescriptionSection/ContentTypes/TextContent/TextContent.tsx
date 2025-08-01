import { Paragraph } from '@/components/styles';
import classes from './TextContent.module.scss';

export const TextContent = ({ content }: { content: string }) => (
  <Paragraph size='md' className={classes.text}>{content}</Paragraph>
);