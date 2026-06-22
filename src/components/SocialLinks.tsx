import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19349B5Cft/',
    icon: <span className="font-sans text-sm font-black leading-none">f</span>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lightdashh?igsh=MXBlOWtkcWpjcmd5dw==',
    icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6283161046331?text=Halo',
    icon: <MessageCircle className="h-4 w-4" aria-hidden="true" />,
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-3 md:justify-end">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="grid h-9 w-9 place-items-center rounded-full border border-primary/35 text-primary transition-all hover:border-primary hover:bg-primary hover:text-on-primary active:scale-95"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
