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
