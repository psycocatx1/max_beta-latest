import { Phone } from 'lucide-react';
import { Button } from '@/components';
import classes from './CTAButton.module.scss';

export const CTAButton = ({ href, text }: { href: string, text: string }) => (
  <div className={classes.cta}>
    <Button href={href} className={classes.cta__button} variant='primary'>
      <Phone size={20} />
      {text}
    </Button>
  </div>
)