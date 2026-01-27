import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Karnataka Education Development Organization</h3>
            <p className="text-sm opacity-90">
              Empowering education across Karnataka through quality resources, community engagement, and dedicated support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('vision')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('resources')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+91 80 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Mail className="h-5 w-5 shrink-0" />
                <span>info@kedorg.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>© {new Date().getFullYear()} Karnataka Education Development Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
