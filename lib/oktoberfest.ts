/**
 * Oktoberfest 2026 runs 19 September – 4 October. The restaurant starts serving
 * the Wiesn "Schmankerl" menu ahead of the official opening, so the app shows a
 * countdown until 19 Sept and switches to a "it's on now" message afterwards.
 *
 * These dates are hard-coded for 2026 on purpose — the seasonal menu is a
 * manual update each year anyway (see the note in lib/menuData.ts).
 */
export const OKTOBERFEST_START = new Date('2026-09-19T00:00:00');

export type OktoberfestPhase = {
  /** true once the festival itself has opened. */
  started: boolean;
  /** Whole days from `now` until the opening (0 once it has started). */
  daysUntilStart: number;
};

export function oktoberfestPhase(now: Date): OktoberfestPhase {
  const msUntilStart = OKTOBERFEST_START.getTime() - now.getTime();
  return {
    started: msUntilStart <= 0,
    daysUntilStart: Math.max(0, Math.ceil(msUntilStart / 86_400_000)),
  };
}
