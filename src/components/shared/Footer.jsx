import Link from "next/link";
import { Lightbulb, Mail, MapPin, X } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo & Mission */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                IdeaVault
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering innovators to share, validate, and grow their startup
              concepts through community collaboration.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/ideas"
                  className="hover:text-primary transition-colors"
                >
                  Browse Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-primary transition-colors"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/add-idea"
                  className="hover:text-primary transition-colors"
                >
                  Submit an Idea
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@ideavault.io</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Global Innovation Hub</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaTwitter className="h-5 w-5" />{" "}
                {/* This is the updated X logo */}
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IdeaVault Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
