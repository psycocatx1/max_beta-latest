import classes from './Home.module.scss';
import { AnimatedSection } from '@/components/public/common/for/section/AnimatedSection';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection/ServicesSection';
import { VideoSection } from './sections/VideoSection/VideoSection';
import { WhyUsSection } from './sections/WhyUsSection/WhyUsSection';
import { TechnologySection } from './sections/TechnologySection/TechnologySection';
import { IntegrationsSection } from './sections/IntegrationsSection/IntegrationsSection';
import { CTASection } from './sections/CTASection/CTASection';

export const Home = () => {
  return (
    <div className={classes.home_page}>
      <HeroSection />
      <ServicesSection />

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