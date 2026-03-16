import { Link } from "react-router-dom";
import logo from "@/assets/logo_2.png";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/services/api";

const Footer = () => {

  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/footer/`)
      .then((res) => res.json())
      .then((data) => setFooter(data))
      .catch((err) => console.log(err));
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={logo}
                alt="AI-Setu ERP"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-primary-foreground/60">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Quick Links</h4>
            <nav className="space-y-2">
              {footer.quick_links?.map((l: any) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Policies</h4>
            <nav className="space-y-2">
              {footer.policies?.map((l: any) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p>{footer.email}</p>
              <p dangerouslySetInnerHTML={{ __html: footer.address }} />
              <p>{footer.phone}</p>
            </div>
          </div>

        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} AI-Setu ERP by Harikrushn DigiVerse LLP. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;