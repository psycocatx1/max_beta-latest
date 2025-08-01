import { LocalItemDescription, LocalItemDescriptionType } from '@lib/api/services/types/local-item-descriptions.types';
import { TextContent } from './TextContent';
import { ImageContent } from './ImageContent';
import { LinkContent } from './LinkContent';
import { VideoContent } from './VideoContent';

type DescriptionContentProps = {
  description: LocalItemDescription;
}

export const DescriptionContent = ({ description }: DescriptionContentProps) => {
  switch (description.type) {
    case LocalItemDescriptionType.TEXT:
      return <TextContent content={description.content} />;
    case LocalItemDescriptionType.IMAGE:
      return <ImageContent content={description.content} title={description.title} />;
    case LocalItemDescriptionType.LINK:
      return <LinkContent content={description.content} title={description.title} />;
    case LocalItemDescriptionType.VIDEO:
      return <VideoContent content={description.content} title={description.title} />;
  }
};