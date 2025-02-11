import type { UserId } from '$/commonTypesWithClient/branded';
import { InitGameModel, type GameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiusRepository';
import { randomUUID } from 'crypto';
export const gradiusUaeCase = {
  input: async (type: number, user: UserId) => {
    if (type === 6) {
      gradiusUaeCase.beam(user);
    } else {
      const myPlane: GameModel = await gradiusRepository
        .findOfUser(user)
        .games.filter((gra) => gra.type === 'owner')[0]; //ownerは1つ
      const newXYZ = myPlane.xyz;
      newXYZ[type % 3] += (Math.floor(type / 3) - 0.5) * 2;
      const newMyPlane: GameModel = { ...myPlane, xyz: newXYZ };
      gradiusRepository.save(newMyPlane, user);
    }
  },
  beam: (user: UserId) => {
    gradiusRepository.create(
      {
        ...InitGameModel,
        user,
        type: 'follower',
        id: randomUUID(),
        vector: [1, 0, 0],
        created: new Date().getTime(),
      },
      null
    );
  },
  // clash: async () => {クラッシュむずくね？？？
  //   const ownersXYZ = gradiusRepository
  //     .findWithType('owner')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz }));
  //   const beamsXYZ = gradiusRepository
  //     .findWithType('beam')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz, owner: gra.owner }));
  //   const othersBeamsXYZ = (name: string) =>
  //     ownersXYZ.map((owner) =>
  //       beamsXYZ.filter((beam) => beam.owner !== owner.name).map((other) => other.xyz)
  //     );
  //   ownersXYZ.map((owner) => {
  //     //
  //   });
  // },
};
