import errou from '../../../assets/music/errou.mp3';
import tetra from '../../../assets/music/tetra.mp3';

import { Howl } from 'howler';

export const soundErrou = new Howl({
  src: errou,
  html5: true,
  onload: () => {
    soundErrou.volume(0.9);
  },
});

export const soundTetra = new Howl({
  src: tetra,
  html5: true,
  onload: () => {
    soundErrou.volume(0.9);
  },
});
