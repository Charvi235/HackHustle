import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Card className="p-12 md:p-16 bg-gradient-card border-border shadow-glow max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Gift className="w-4 h-4 mr-2" />
            Limited Time Offer
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learning Journey?
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who've accelerated their careers 
            with HackHustle. Start your free trial today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild variant="hero" size="lg" className="px-8 py-4 text-lg font-semibold">
              <Link to="/practice">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Link to="/interview">
                Schedule Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            No credit card required • 7-day free trial • Cancel anytime
          </div>
        </Card>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent rounded-full opacity-20 animate-bounce" />
    </section>
  );
};