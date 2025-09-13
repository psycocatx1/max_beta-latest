import classes from '../ServiceCard.module.scss';

export const PriceSection = ({ formatted_discount_price, formatted_price }: { formatted_discount_price: string | null, formatted_price: string }) => (
  <div className={classes.card__price}>
    {formatted_discount_price ? (
      <>
        <span className={classes.card__price_current}>
          {formatted_discount_price}
        </span>
        <span className={classes.card__price_original}>
          {formatted_price}
        </span>
      </>
    ) : (
      <span className={classes.card__price_current}>
        {formatted_price}
      </span>
    )}
  </div>
);