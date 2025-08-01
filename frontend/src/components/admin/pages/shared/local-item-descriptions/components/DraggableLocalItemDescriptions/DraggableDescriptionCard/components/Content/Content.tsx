import { LocalItemDescription, LocalItemDescriptionType } from '@/lib/api';
import { Text } from './Text';
// линтер ругается на Image без alt, поэтому переименовано на ImageContent
import { Image as ImageContent } from './Image';
import { Video } from './Video';
import { Link } from './Link';
import classes from '../../DraggableDescriptionCard.module.scss';

type ContentProps = {
  description: LocalItemDescription;
}

export const Content = ({ description }: ContentProps) => {
  const renderContent = () => {
    switch (description.type) {
      case LocalItemDescriptionType.TEXT:
        return <Text content={description.content} />;
      case LocalItemDescriptionType.IMAGE:
        return <ImageContent content={description.content} title={description.title} />;
      case LocalItemDescriptionType.VIDEO:
        return <Video content={description.content} title={description.title} />;
      case LocalItemDescriptionType.LINK:
        return <Link content={description.content} />;
    }
  }

  return (
    <div className={classes.card_content}>
      {renderContent()}
    </div>
  )
}