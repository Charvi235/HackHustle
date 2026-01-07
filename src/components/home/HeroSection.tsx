import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroLightBg from '@/assets/hero-bg-light.jpg';
import heroDarkBg from '@/assets/hero-bg-dark.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero z-10" />
        <img 
          src={heroLightBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover dark:hidden"
        />
        <img 
          src={heroDarkBg} 
          alt="Hero Background Dark" 
          className="w-full h-full object-cover hidden dark:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 text-sm font-medium px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Learning Platform
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Master Skills with{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              HackHustle
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your learning journey with AI-powered mock interviews, competitive quizzes, 
            and personalized skill assessments. Join thousands of students already leveling up.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="hero" size="lg" className="px-8 py-3 text-lg font-semibold">
              <Link to="/practice">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Free
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm text-muted-foreground">Questions Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent rounded-full opacity-30 animate-bounce" />
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-brand-warning rounded-full opacity-25 animate-ping" />
    </section>
  );
};