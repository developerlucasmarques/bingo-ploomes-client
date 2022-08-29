import { DrawnNumberAndKey } from './drawn-number-key.type';

export type ReceivedBalls = {
  ballAndKey: DrawnNumberAndKey;
  lastSixBalls: number[];
};
