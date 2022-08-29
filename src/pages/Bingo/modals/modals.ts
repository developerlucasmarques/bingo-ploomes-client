import swall from 'sweetalert';

export const modalAddPoints = () => {
  swall({
    icon: 'success',
    title: 'Você bingou e ganhou 1 ponto',
    timer: 7000,
  });
};

export const modalUserMadePoint = (nickname: string) => {
  swall({
    icon: 'success',
    title: `${nickname} fez um ponto`,
    timer: 7000,
  });
};

export const modalRemovePoints = () => {
  swall({
    icon: 'error',
    title: 'Você não bingou e não poderá bingar pelas próximas 5 rodadas',
    timer: 7000,
  });
};


