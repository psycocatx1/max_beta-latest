import { Heading, Paragraph } from '@/components/styles';
import classes from './Price.module.scss';

export const Price = ({ price, discount_price }: { price: number, discount_price: number | null }) => (
  <div className={classes.price}>
    {!!discount_price ? (
      <>
        <Heading size='md' className={classes.price__current}>
          {discount_price}
        </Heading>
        <Paragraph size='sm' className={classes.price__original}>
          {price}
        </Paragraph>
      </>
    ) : (
      <Heading size='md' className={classes.price__current}>
        {price}
      </Heading>
    )}
  </div>
);