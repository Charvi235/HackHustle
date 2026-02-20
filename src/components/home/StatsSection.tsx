import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Clock, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Students',
    description: 'Learning and growing daily',
    color: 'text-blue-500',
  },
  {
    icon: Award,
    value: '1M+',
    label: 'Questions Solved',
    description: 'Practice makes perfect',
    color: 'text-green-500',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    description: 'Students improving scores',
    color: 'text-purple-500',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Mentor Support',
    description: 'Always here to help',
    color: 'text-orange-500',
  },
];

export const StatsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Platform Statistics
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted by Students{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a thriving community of learners who are achieving their goals 
            with HackHustle's innovative approach to education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="p-8 text-center bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};