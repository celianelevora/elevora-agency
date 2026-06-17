/**
 * Rate limiter in-memory (sans dépendance externe).
 * Adapté à un serveur Node.js unique (Infomaniak). Le compteur est réinitialisé
 * au redémarrage du process et n'est pas partagé entre instances — suffisant pour
 * protéger un endpoint de formulaire contre les abus/spam basiques.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Nettoyage paresseux : on purge les entrées expirées à chaque appel pour éviter
// que la Map ne grossisse indéfiniment.
function sweep(now: number): void {
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Secondes avant réinitialisation (utile pour l'en-tête Retry-After). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): RateLimitResult {
  const { limit, windowMs } = options;
  const now = Date.now();

  if (buckets.size > 5000) sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  if (existing.count > limit) {
    return { allowed: false, remaining: 0, retryAfter };
  }
  return { allowed: true, remaining: Math.max(0, limit - existing.count), retryAfter };
}

/** Extrait l'IP cliente derrière le proxy (Infomaniak) à partir des en-têtes. */
export function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
