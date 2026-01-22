type CspOptions = {
  reportUri?: string;
};

const CALCOM_DOMAINS = ["https://cal.com", "https://*.cal.com", "https://api.cal.com"];
const CDN_DOMAINS = ["https://cdn.mdtechspire.com"];
const IMAGE_DOMAINS = ["https://images.unsplash.com"];

function formatDirectives(directives: Record<string, string[]>): string {
  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
}

export function buildCsp(options: CspOptions = {}): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
    "script-src": ["'self'", "'unsafe-inline'", ...CALCOM_DOMAINS],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", ...CDN_DOMAINS, ...IMAGE_DOMAINS],
    "font-src": ["'self'", "data:", ...CDN_DOMAINS],
    "connect-src": ["'self'", ...CALCOM_DOMAINS],
    "frame-src": [...CALCOM_DOMAINS],
    "media-src": ["'self'", ...CDN_DOMAINS],
  };

  if (options.reportUri) {
    directives["report-uri"] = [options.reportUri];
  }

  return formatDirectives(directives);
}
