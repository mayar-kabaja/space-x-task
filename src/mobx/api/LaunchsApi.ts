export const getLaunchs = (): Promise<object[]> => {
  return fetch('https://api.spacexdata.com/v3/launches')
    .then((res) => res.json());
};
export const getOneLaunch = (flightNumber : number): Promise<object> => {
  return fetch(`https://api.spacexdata.com/v3/launches/${flightNumber}`)
    .then((res) => res.json());
};
