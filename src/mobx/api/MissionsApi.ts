import { Mission } from '../../utils';

export const getMission = (): Promise<Mission[]> => {
  return fetch('https://api.spacexdata.com/v3/missions')
    .then((res) => res.json());
};
