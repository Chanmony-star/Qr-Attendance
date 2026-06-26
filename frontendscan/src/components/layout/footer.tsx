"use client";

import { QrCode, Github, Twitter } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "API", "Integrations", "Changelog"],
  Solutions: ["Schools", "Universities", "Enterprises", "Events", "Remote Teams"],
  Resources: ["Documentation", "Guides", "Blog", "Help Center", "Community"],
  Company: ["About", "Careers", "Partners", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "GDPR", "Cookies"],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-border-subtle bg-gray-50/50 dark:bg-navy-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 transition-colors group-hover:bg-brand-700">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight dark:text-white text-navy-950">
                AttendFlow
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-500 dark:text-text-soft leading-relaxed">
              Smart QR attendance tracking for modern institutions. Simplify, secure, and scale your
              attendance management.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 dark:text-text-soft hover:text-gray-600 dark:hover:text-text-muted bg-gray-100 dark:bg-white/5 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 dark:text-text-soft hover:text-gray-600 dark:hover:text-text-muted bg-gray-100 dark:bg-white/5 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold dark:text-white text-navy-950 mb-4">{group}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 dark:text-text-soft hover:text-gray-900 dark:hover:text-text-muted transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-text-soft">
            &copy; {new Date().getFullYear()} AttendFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-400 dark:text-text-soft hover:text-gray-600 dark:hover:text-text-muted transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 dark:text-text-soft hover:text-gray-600 dark:hover:text-text-muted transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
