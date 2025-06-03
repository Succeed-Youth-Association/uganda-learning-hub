
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: 'https://x.com/jesse_comedian',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/share/18uh7arKyh',
      color: 'hover:text-blue-600'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@freshteacher5692',
      color: 'hover:text-red-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/mutumbajessepaul',
      color: 'hover:text-pink-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Fresh-Teacher',
      color: 'hover:text-gray-600'
    }
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
  <h4 className="text-md font-semibold text-foreground mb-4">Contact Us</h4>
  <div className="space-y-2">
    <a 
      href="tel:+256750687790"
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
    >
      <FaWhatsapp className="w-4 h-4" />
      +256750687790
    </a>
    <a 
      href="tel:+256786812837"
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
    >
      <Phone className="w-4 h-4" />
      +256786812837
    </a>
    <a 
      href="mailto:freshteacheruganda256@gmail.com"
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
    >
      <Mail className="w-4 h-4" />
      freshteacheruganda256@gmail.com
    </a>
  </div>
</div>

          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link 
                to="/about" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/disclaimer" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link 
                to="/terms" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fresh Teacher's Technologies <br /> 
            Made with <span className="inline-block animate-pulse-heart">❤️</span> by Fresh Teacher
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;