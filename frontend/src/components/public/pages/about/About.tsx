import dynamic, { DynamicOptions } from 'next/dynamic';
import classes from './About.module.scss';
import { AnimatedSection } from '@/components/public/common/for/section/AnimatedSection';
import { SectionLoader } from '../../common';

const options: DynamicOptions = {
  ssr: true,
  loading: () => <SectionLoader />
};

// Динамическая подгрузка секций
const HeroSection = dynamic(() => import('./sections/HeroSection').then(mod => ({ default: mod.HeroSection })), { ...options });
const ValuesSection = dynamic(() => import('./sections/ValuesSection').then(mod => ({ default: mod.ValuesSection })), { ...options });
const TeamSection = dynamic(() => import('./sections/TeamSection').then(mod => ({ default: mod.TeamSection })), { ...options });

export const About = () => {
  return (
    <div className={classes.about_page}>
      <AnimatedSection animation="fadeInUp" enableAnimations={true} delay={0} useCssOnly>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true} useCssOnly>
        <ValuesSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true} useCssOnly>
        <TeamSection />
      </AnimatedSection>
    </div>
  );
};
