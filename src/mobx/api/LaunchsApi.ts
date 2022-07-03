import { Launch } from '../../utils';

export const getLaunchs = (): Promise<Launch[]> => {
  return fetch('https://api.spacexdata.com/v3/launches')
    .then((res) => res.json());
};
