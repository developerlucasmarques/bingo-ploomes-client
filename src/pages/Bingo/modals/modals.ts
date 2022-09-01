import swall from "sweetalert";

export const modalAddPoints = () => {
  swall({
    icon: "success",
    title: "Parabéns você bingou e ganhou a partida!!!!",
    timer: 7000,
  });
};

export const modalUserMadePoint = (nickname: string) => {
  swall({
    icon: "success",
    title: `${nickname} ganhou a partida`,
    timer: 10000,
  });
};

export const modalRemovePoints = () => {
  swall({
    icon: "error",
    title: "Você não bingou e não poderá bingar pelas próximas 5 rodadas",
    timer: 7000,
  });
};
