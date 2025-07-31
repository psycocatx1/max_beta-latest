import dynamic, { DynamicOptions } from 'next/dynamic';
import { AnimatedSection } from '@/components/public/common/AnimatedSection';
import classes from './Contacts.module.scss';
import { SectionLoader } from '../../common';
import { ToastProvider } from '@/providers/ToastProvider';

const options: DynamicOptions = {
  ssr: true,
  loading: () => <SectionLoader />,
}

// Динамическая подгрузка секций
const HeroSection = dynamic(() => import('./sections').then(mod => ({ default: mod.HeroSection })), { ssr: true });
const ContactInfoSection = dynamic(() => import('./sections').then(mod => ({ default: mod.ContactInfoSection })), { ...options });
const ContactFormSection = dynamic(() => import('./sections').then(mod => ({ default: mod.ContactFormSection })), { ...options });
const MapSection = dynamic(() => import('./sections').then(mod => ({ default: mod.MapSection })), { ...options });

export const Contacts = () => {
  return (
    <ToastProvider>
      <div className={classes.contacts_page}>
        <AnimatedSection animation="fadeInUp" enableAnimations={true}>
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true}>
          <ContactInfoSection />
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={400} enableAnimations={true}>
          <ContactFormSection />
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={600} enableAnimations={true}>
          <MapSection />
        </AnimatedSection>
      </div>
    </ToastProvider>
  );
}; 