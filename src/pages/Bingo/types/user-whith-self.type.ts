import { GeneratedCard } from './generated-card.type';

export type UserWhithSelf = {
  id: string;
  nickname: string;
  score: number;
  isSelf: boolean;
  host: boolean;
  imageLink: string;
  cards: [
    {
      id: string;
      numbers: GeneratedCard;
    }
  ];
};
