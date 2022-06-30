import { observable, action } from 'mobx';
import React from 'react';
import { getLaunchs, getOneLaunch } from '../api';
import { Launch } from '../../utils';

class LaunchsStore {
  @observable launchs: Launch[] = [];

  @observable filterLaunchs: Launch[] = [];

  @action
    addLaunchs = () => {
      getLaunchs().then((launchs) => {
        this.launchs = launchs;
        this.filterLaunchs = launchs;
      });
    };

  @action
    addOneLaunch = (flightNumber: number) => {
      getOneLaunch(flightNumber).then((launch) => {
        this.filterLaunchs = [];
        this.filterLaunchs.push(launch);
      });
    };
}
export default LaunchsStore;
