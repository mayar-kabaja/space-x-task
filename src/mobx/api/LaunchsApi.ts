import React from 'react';
import { Launch } from '../../utils';

export const getLaunchs = (): Promise<Launch[]> => {
  return fetch('https://api.spacexdata.com/v3/launches')
    .then((res) => res.json());
};
export const getOneLaunch = (flightNumber : number): Promise<Launch> => {
  return fetch(`https://api.spacexdata.com/v3/launches/${flightNumber}`)
    .then((res) => res.json());
};
