import styles from './Footer.module.scss';
import { Container } from '@/components';
import { Bottom, Company, Socials, Solutions, Contacts } from './components';

export const Footer = async () => (
  <footer className={styles.footer}>
    <Container className={styles.footer__container}>
      <div className={styles.footer__content}>
        <Socials />
        <Company />
        <Solutions />
        <Contacts />
      </div>
    </Container>
    <Bottom />
  </footer>
);