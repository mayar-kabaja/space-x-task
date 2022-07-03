/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import {
  observable, action, makeObservable, runInAction,
} from 'mobx';
import React from 'react';
import { getLaunchs } from '../api';
import { Launch } from '../../utils';

type obj = {
  launchYear: any,
  rocketCore: any,
  rocketFiring: any,
  rocketName: any,
  lanching: any,
  landing: any,
  flightNumber: any,
}
class LaunchsStore {
  @observable launchs: Launch[] = [];

  @observable isLoading = false;

  @observable filters : obj = {
    launchYear: 'All',
    rocketCore: 'All',
    rocketFiring: 'All',
    rocketName: 'All',
    lanching: 'All',
    landing: 'All',
    flightNumber: 'All',
  };

  constructor() {
    makeObservable(this);
  }

  @action
    addLaunchs = async () => {
      const launchs = await getLaunchs();
      runInAction(() => {
        const filteByFlightNumber = this.filters.flightNumber === 'All'
          ? launchs
          : launchs.filter(({ flight_number }) => flight_number === this.filters.flightNumber);
        const filteBylaunchYear = this.filters.launchYear === 'All'
          ? launchs
          : launchs.filter(({ launch_year }) => +launch_year === this.filters.launchYear);
        const filteByLanding = this.filters.landing === 'All'
          ? launchs
          : launchs.filter(
            ({
              rocket: {
                first_stage: {
                  cores: [{ land_success }],
                },
              },
            }) => ((this.filters.landing === 'success' && land_success === true) || (this.filters.landing === 'fail' && land_success === false)),
          );
        const filteBylaunchSuccess = this.filters.lanching === 'All'
          ? launchs
          : launchs.filter(({ launch_success }) => (this.filters.lanching === 'success' && launch_success === true) || (this.filters.lanching === 'fail' && launch_success === false));
        const filteByRocketName = this.filters.rocketName === 'All'
          ? launchs
          : launchs.filter(({ rocket: { rocket_name } }) => rocket_name === this.filters.rocketName);
        // eslint-disable-next-line no-multi-assign
        const filteByRocetCore = this.filters.rocketCore === 'All'
          ? launchs
          : launchs.filter(({ rocket: { first_stage: { cores: [{ reused }] } } }) => (this.filters.rocketCore === 'reused' && reused === true) || (this.filters.lanching === 'not reused' && reused === false));
        // eslint-disable-next-line no-multi-assign
        const filteByfairings = this.filters.rocketFiring === 'All'
          ? launchs
          : launchs.filter(({ rocket: { fairings } }) => (this.filters.rocketFiring === 'reused' && fairings?.reused === true) || (this.filters.rocketFiring === 'not reused' && fairings?.reused === false));

        this.launchs = filteByFlightNumber.filter((launch) => filteBylaunchYear.indexOf(launch) !== -1
        && filteByFlightNumber.indexOf(launch) !== -1
        && filteByLanding.indexOf(launch) !== -1
        && filteBylaunchSuccess.indexOf(launch) !== -1
        && filteByRocketName.indexOf(launch) !== -1
        && filteByRocetCore.indexOf(launch) !== -1
        && filteByfairings.indexOf(launch) !== -1);
        this.isLoading = true;
      });
    };
}

export default LaunchsStore;
