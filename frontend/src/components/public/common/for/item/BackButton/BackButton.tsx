import { ArrowLeft } from 'lucide-react';
import { useRouter } from '@hooks/useRouting';
import { Button } from '@/components/styles';
import classes from './BackButton.module.scss';

export const BackButton = ({ text }: { text: string }) => {
  return (
    <Button
      variant='secondary'
      onClick={useRouter().back}
      className={classes.back_button}
    >
      <ArrowLeft size={20} />
      {text}
    </Button>
  );
};