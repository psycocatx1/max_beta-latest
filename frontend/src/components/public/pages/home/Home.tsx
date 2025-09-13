import dynamic, { DynamicOptions } from 'next/dynamic';
import classes from './Home.module.scss';
import { AnimatedSection } from '@/components/public/common/for/section/AnimatedSection';
import { SectionLoader } from '../../common';

const options: DynamicOptions = {
  ssr: true,
  loading: () => <SectionLoader />
};

// Динамическая подгрузка секций
const HeroSection = dynamic(() => import('./sections/HeroSection').then(mod => ({ default: mod.HeroSection })), { ssr: true });
const ServicesSection = dynamic(() => import('./sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), { ...options });
const VideoSection = dynamic(() => import('./sections/VideoSection').then(mod => ({ default: mod.VideoSection })), { ...options });
const WhyUsSection = dynamic(() => import('./sections/WhyUsSection').then(mod => ({ default: mod.WhyUsSection })), { ...options });
const TechnologySection = dynamic(() => import('./sections/TechnologySection').then(mod => ({ default: mod.TechnologySection })), { ...options });
const IntegrationsSection = dynamic(() => import('./sections/IntegrationsSection').then(mod => ({ default: mod.IntegrationsSection })), { ...options });
const CTASection = dynamic(() => import('./sections/CTASection').then(mod => ({ default: mod.CTASection })), { ...options });

export const Home = () => {
  return (
    <div className={classes.home_page}>
      <AnimatedSection animation="fadeInUp" delay={0}>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50} >
        <ServicesSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50}>
        <VideoSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50}>
        <WhyUsSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50}>
        <TechnologySection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50}>
        <IntegrationsSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={50}>
        <CTASection />
      </AnimatedSection>
    </div>
  );
}; 