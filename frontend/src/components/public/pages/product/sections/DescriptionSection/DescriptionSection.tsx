import { useTranslations } from 'next-intl';
import classes from './DescriptionSection.module.scss';
import { getImageUrl, LocalItemDescription } from '@/lib/api';
import { Image } from '@/components/Image';
import { LocalItemDescriptionType } from '@prisma/client';
import { Container, Heading, Paragraph, Section } from '@/components/styles';

type DescriptionSectionProps = {
  descriptions: LocalItemDescription[];
}

export const DescriptionSection = ({ descriptions }: DescriptionSectionProps) => {
  const t = useTranslations('public.pages.product.detail');
  return (
    <Section>
      {descriptions.length > 0 && (
        <Container narrow className={classes.description__local_descriptions}>
          <Heading size='lg' className={classes.description__section_title}>{t('additional_info')}</Heading>
          <div className={classes.description__descriptions_list}>
            {descriptions.map((desc) => (
              <div key={desc.id} className={classes.description__description_item}>
                {desc.title && (
                  <Heading size='md' className={classes.description__description_title}>{desc.title}</Heading>
                )}
                {desc.type === LocalItemDescriptionType.TEXT && (
                  <Paragraph size='md' className={classes.description__description_content}>{desc.content}</Paragraph>
                )}
                {desc.type === LocalItemDescriptionType.IMAGE && (
                  <div className={classes.description__description_image}>
                    <Image
                      src={getImageUrl(desc.content)}
                      alt={desc.title || desc.content}
                      width={400}
                      height={300}
                      className={classes.description__description_img}
                    />
                  </div>
                )}
                {desc.type === LocalItemDescriptionType.LINK && (
                  <Paragraph
                    size='md'
                    href={desc.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.description__description_link}
                  >
                    {desc.title || desc.content}
                  </Paragraph>
                )}
                {desc.type === LocalItemDescriptionType.VIDEO && (
                  <div className={classes.description__description_video}>
                    <iframe
                      src={desc.content}
                      title={desc.title || desc.content}
                      className={classes.description__description_iframe}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}
    </Section>
  );
};