import { useTranslations } from 'next-intl';
import classes from './DescriptionSection.module.scss';
import { LocalItemDescription } from '@/lib/api';
import { LocalItemDescriptionType } from '@prisma/client';
import { Container, Heading, Section } from '@/components/styles';
import { DescriptionContent } from './ContentTypes/DescriptionContent';

type DescriptionSectionProps = {
  descriptions: LocalItemDescription[];
}

export const DescriptionSection = ({ descriptions }: DescriptionSectionProps) => {
  const t = useTranslations('public.pages.product.detail');

  return (
    <Section>
      {descriptions.length > 0 && (
        <Container className={classes.description__local_descriptions}>
          <Heading size='lg' className={classes.description__section_title}>{t('additional_info')}</Heading>
          <div className={classes.description__descriptions_list}>
            {descriptions.map((description) => (
              <div key={description.id} className={classes.description__description_item}>
                {description.title && description.type !== LocalItemDescriptionType.IMAGE && (
                  <Heading size='md' className={classes.description__description_title}>{description.title}</Heading>
                )}
                <DescriptionContent description={description} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </Section>
  );
};