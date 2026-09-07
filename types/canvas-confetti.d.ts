declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    scalar?: number;
    ticks?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    angle?: number;
    colors?: string[];
    shapes?: string[];
    zIndex?: number;
    disableForReducedMotion?: boolean;
    flat?: boolean;
    useWorker?: boolean;
  }
  export type CreateTypes = (options?: Options) => Promise<unknown> | unknown;
  const confetti: CreateTypes;
  export default confetti;
}
