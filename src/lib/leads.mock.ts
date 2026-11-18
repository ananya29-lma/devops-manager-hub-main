import type { DemoInput, EmailInput } from "./leads";

/**
 * Front-end only mock "API". Waits briefly and resolves, so forms show real
 * loading and success states. Replace with a real request when a backend exists.
 */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function submitEmail(_data: EmailInput) {
  await wait(700);
  return { ok: true as const, ref: `EA-${Date.now().toString(36).toUpperCase()}` };
}

export async function submitDemo(_data: DemoInput) {
  await wait(900);
  return { ok: true as const, ref: `DM-${Date.now().toString(36).toUpperCase()}` };
}
