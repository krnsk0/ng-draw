import { hslTriple } from './types';

/**
 * return a random int between min and max
 */
export const random = (min: number, max: number) =>
  min + Math.floor(Math.random() * Math.floor(max));

/**
 * convert an hslColor triple to a an hsl() string for
 * consumption in CSS
 */
export const convertColorTripleToString = (hslColor: hslTriple): string => {
  const [h, s, l] = hslColor;
  return `hsl(${h.toString()}, ${s.toString()}%, ${l.toString()}%)`;
};

/**
 * Generate random color triple
 */
export const makeRandomHslColor = (): hslTriple => {
  return [random(1, 360), random(25, 100), random(25, 75)];
};

/**
 * Calculate distance between two points
 */
export const euclideanDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
