import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StatsSection } from '@/components/home/StatsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="about">
        <FeaturesSection />
      </div>
      <StatsSection />
    </div>
  );
};

export default Index;
