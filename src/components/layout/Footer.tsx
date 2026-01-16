import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Practice MCQs', href: '/practice' },
      { label: 'Mock Interviews', href: '/interview' },
      { label: 'Quiz Battles', href: '/battle' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                HackHustle
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Empowering students worldwide with AI-driven learning experiences. 
              Master skills, ace interviews, and achieve your career goals.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
