import { getTranslations } from 'next-intl/server';
import classes from './IntegrationsSection.module.scss';
import { Image } from '@/components/common/Image';
import integration_courier_image from '@/../public/public/home/integrations-courier.png';

import shopify_logo from '@/../public/public/home/shopify-logo.png';
import woocommerce_logo from '@/../public/public/home/woocommerce-logo.png';
import magento_logo from '@/../public/public/home/magento-logo.png';
import allegro_logo from '@/../public/public/home/allegro-logo.png';
import prestashop_logo from '@/../public/public/home/prestashop-logo.png';
import sap_logo from '@/../public/public/home/sap-logo.png';

import dpd_logo from '@/../public/public/home/dpd-logo.png';
import dhl_logo from '@/../public/public/home/dhl-logo.png';
import fedex_logo from '@/../public/public/home/fedex-logo.png';
import ups_logo from '@/../public/public/home/ups-logo.png';
import { Button, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const IntegrationsSection = async () => {
  const t = await getTranslations('public.pages.home.integrations');

  const platforms = [
    { name: 'Shopify', logo: shopify_logo.src, href: 'https://www.shopify.com' },
    { name: 'WooCommerce', logo: woocommerce_logo.src, href: 'https://www.woocommerce.com' },
    { name: 'Magento', logo: magento_logo.src, href: 'https://www.magento.com' },
    { name: 'Allegro', logo: allegro_logo.src, href: 'https://allegro.pl' },
    { name: 'Prestashop', logo: prestashop_logo.src, href: 'https://www.prestashop.com' },
    { name: 'SAP', logo: sap_logo.src, href: 'https://www.sap.com' },
  ];

  const couriers = [
    { name: 'FedEx', logo: fedex_logo.src, href: 'https://www.fedex.com' },
    { name: 'DHL', logo: dhl_logo.src, href: 'https://www.dhl.com' },
    { name: 'UPS', logo: ups_logo.src, href: 'https://www.ups.com' },
    { name: 'DPD', logo: dpd_logo.src, href: 'https://www.dpd.com' },
  ];

  return (
    <Section className={classes.integrations}>
      <Container>
        <Heading size='xl' className={classes.integrations__title}>
          {t('title')}
        </Heading>

        <div className={classes.integrations__logos}>
          {platforms.map((platform, index) => (
            <Card key={index} className={classes.integrations__logos_item} href={platform.href}>
              <Image
                src={platform.logo}
                alt={platform.name}
                width={100}
                height={100}
                quality={100}
              />
            </Card>
          ))}
        </div>

        <Button variant='primary' className={classes.integrations__button}>
          {t('button_text')}
        </Button>

        <Card className={classes.integrations__courier}>
          <div className={classes.integrations__courier_container}>
            <div className={classes.integrations__courier_content}>
              <Heading size='lg' className={classes.integrations__courier_title}>{t('courier.title')}</Heading>
              <Paragraph size='md' className={classes.integrations__courier_description}>{t('courier.description')}</Paragraph>

            </div>
            <div className={classes.integrations__courier_item}>
              <Image
                src={integration_courier_image.src}
                alt="Courier Network"
                width={500}
                height={300}
                quality={100}
              />
            </div>
          </div>
          <div className={classes.integrations__courier_logos}>
            {couriers.map((courier, index) => (
              <Card key={`${courier.name}-${index}`} className={classes.integrations__courier_logos_item} href={courier.href}>
                <Image
                  src={courier.logo}
                  alt={courier.name}
                  width={100}
                  height={100}
                  quality={100}
                />
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    </Section>
  );
}; 