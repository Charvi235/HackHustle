import { useState } from 'react'; // 👈 State import kiya
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
      { label: 'About Us', href: '/#about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export const Footer = () => {
  // 👇 Popup dikhane ya chupane ke liye state
  const [showContact, setShowContact] = useState(false);

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
                  // 👇 'relative' class lagayi taaki box theek iske upar khule
                  <li key={link.label} className="relative">
                    
                    {/* ✅ Agar link 'Contact Us' hai toh ye block chalega */}
                    {link.label === 'Contact Us' ? (
                      <div>
                        <button
                          onClick={() => setShowContact(!showContact)}
                          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-left"
                        >
                          {link.label}
                        </button>
                        
                        {/* 🌟 Ye raha tumhara "Chotu sa block" */}
                        {showContact && (
                          <div className="absolute bottom-full left-0 mb-2 w-max bg-card border border-border shadow-lg rounded-lg p-3 text-sm z-50">
                            Need help? Contact us at <br />
                            <a 
                              href="mailto:hackhustle062@gmail.com" 
                              className="text-primary font-medium hover:underline"
                            >
                              hackhustle062@gmail.com
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      
                      
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors block"
                        onClick={(e) => {
                          if (link.href.startsWith('/#')) {
                            const id = link.href.replace('/#', '');
                            const element = document.getElementById(id);
                            if (element) {
                              e.preventDefault();
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                    
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