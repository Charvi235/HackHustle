import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Trophy, 
  BookOpen, 
  Users, 
  Zap, 
  Target,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: 'AI Mock Interviews',
    description: 'Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.',
    badge: 'AI Powered',
    color: 'bg-blue-500',
  },
  {
    icon: Trophy,
    title: 'Quiz Battles',
    description: 'Compete with friends or random players in fast-paced, real-time quiz competitions.',
    badge: 'Multiplayer',
    color: 'bg-yellow-500',
  },
  {
    icon: BookOpen,
    title: 'Smart Practice',
    description: 'Curated MCQs organized by subject and difficulty, with detailed explanations.',
    badge: 'Adaptive',
    color: 'bg-green-500',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Get help from verified faculty members for complex doubts and concepts.',
    badge: 'Expert Help',
    color: 'bg-purple-500',
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and performance insights.',
    badge: 'Analytics',
    color: 'bg-red-500',
  },
  {
    icon: Zap,
    title: 'Gamification',
    description: 'Earn points, badges, and climb leaderboards to stay motivated.',
    badge: 'Rewards',
    color: 'bg-orange-500',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Core Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines the best learning methodologies 
            with cutting-edge technology to accelerate your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center shadow-md`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <Button 
                variant="ghost" 
                className="w-full justify-between group-hover:bg-primary/10 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild variant="hero" size="lg">
            <Link to="/practice">
              Explore All Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};