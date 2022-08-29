import ciumenta from '../../../assets/music/ciumenta.mp3';
import errou from '../../../assets/music/errou.mp3';

import { Howl } from 'howler';

export const sound = new Howl({
  src: ciumenta,
  html5: true,
  onload: () => {
    sound.volume(0.1);
  },
});

export const soundErrou = new Howl({
  src: errou,
  html5: true,
  onload: () => {
    soundErrou.volume(0.9);
  },
});

export const sounds = [sound, soundErrou];
