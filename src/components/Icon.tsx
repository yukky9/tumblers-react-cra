import type { ReactElement, SVGProps } from 'react';

type IconName =
  | 'arrowRight'
  | 'download'
  | 'phone'
  | 'mail'
  | 'map'
  | 'menu'
  | 'close'
  | 'factory'
  | 'shield'
  | 'bolt'
  | 'file'
  | 'briefcase'
  | 'settings'
  | 'chevronDown'
  | 'external'
  | 'check'
  | 'clock'
  | 'spark';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, ReactElement> = {
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.97.35 1.92.66 2.82a2 2 0 0 1-.45 2.11L8.04 9.92a16 16 0 0 0 6.04 6.04l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.85.53 2.82.66A2 2 0 0 1 22 16.92Z" />,
  mail: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 3-10 6L2 7" />,
  map: <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  factory: <path d="M3 21h18M5 21V8l5 4V8l5 4V5h4v16M8 17h.01M12 17h.01M16 17h.01" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
  file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h8" />,
  briefcase: <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1m-9 0h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm7 6h.01" />,
  settings: <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-13.5v3m0 14v3m9.2-16.2-2.1 2.1M4.9 19.1l-2.1 2.1m18.4 0-2.1-2.1M4.9 4.9 2.8 2.8M22 12h-3M5 12H2" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  external: <path d="M14 3h7v7m0-7L10 14M5 5h6M5 5v14h14v-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5l3 2" />,
  spark: <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm6 12 .9 2.6 2.6.9-2.6.9L18 21l-.9-2.6-2.6-.9 2.6-.9L18 14ZM5 14l.7 2 .3.3 2 .7-2 .7-.3.3-.7 2-.7-2-.3-.3-2-.7 2-.7.3-.3.7-2Z" />
};

export function Icon({ name, className = 'h-5 w-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
