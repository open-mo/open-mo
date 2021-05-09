import { Position } from '../types';
import { Dictionary } from '../../types';

const Vector: Dictionary<Position> = {
  ZERO: {
    x: 0,
    y: 0,
  },
  ONE: {
    x: 1,
    y: 1,
  },
  LEFT: {
    x: -1,
    y: 0,
  },
  RIGHT: {
    x: 1,
    y: 0,
  },
  UP: {
    x: 0,
    y: -1,
  },
  DOWN: {
    x: 0,
    y: 1,
  },
};

const TILE_SIZE: number = 32;

export { Vector, TILE_SIZE };
