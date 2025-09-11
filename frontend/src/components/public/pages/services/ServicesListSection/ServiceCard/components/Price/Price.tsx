import { Heading, Paragraph } from '@/components/styles';
import classes from './Price.module.scss';

export const Price = ({ formatted_discount_price, formatted_price }: { formatted_discount_price: string | null, formatted_price: string }) => (
  <div className={classes.price}>
    {!!formatted_discount_price ? (
      <>
        <Heading size='md' className={classes.price__current}>
          {formatted_discount_price}
        </Heading>
        <Paragraph size='sm' className={classes.price__original}>
          {formatted_price}
        </Paragraph>
      </>
    ) : (
      <Heading size='md' className={classes.price__current}>
        {formatted_price}
      </Heading>
    )}
  </div>
);