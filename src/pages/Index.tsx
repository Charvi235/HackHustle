// import { HeroSection } from '@/components/home/HeroSection';
// import { FeaturesSection } from '@/components/home/FeaturesSection';
// import { StatsSection } from '@/components/home/StatsSection';
// import { Footer } from "@/components/layout/Footer";


// const Index = () => {
//   return (
//     <div className="min-h-screen">
//       <HeroSection />
//       <FeaturesSection />
//       <StatsSection />
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Index;
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StatsSection } from '@/components/home/StatsSection';
// Footer yahan se hata diya kyunki wo App.tsx me hai

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* 👇 Yahan id="about" lagaya hai taaki Footer se yahan aa sakein */}
      <div id="about">
        <FeaturesSection />
      </div>
      
      <StatsSection />
    </div>
  );
};

export default Index;
