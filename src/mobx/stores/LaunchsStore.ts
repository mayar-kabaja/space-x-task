/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import {
  observable, action, makeObservable, computed,
} from 'mobx';
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

  @observable hiddenColumns : string[] = [];

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

  @computed
  get filteredLaunchs() {
    const filtered = this.launchs.filter(({
      flight_number,
      launch_year,
      launch_success,
      rocket: { first_stage: { cores: [{ land_success, reused }] }, rocket_name, fairings },
    }) => {
      const {
        flightNumber, launchYear, lanching, landing, rocketCore, rocketFiring, rocketName,
      } = this.filters;
      if (flightNumber !== 'All' && flight_number != flightNumber) {
        return false;
      }
      if (launchYear !== 'All' && launch_year != launchYear) {
        return false;
      }
      if (lanching !== 'All' && (lanching === 'success' && launch_success === false || lanching === 'fail' && launch_success === true)) {
        return false;
      }
      if (landing !== 'All' && (landing === 'success' && land_success === false || landing === 'fail' && land_success === true)) {
        return false;
      }
      if (rocketName !== 'All' && rocket_name != rocketName) {
        return false;
      }
      if (rocketCore !== 'All' && (rocketCore === 'reused' && reused === false || rocketCore === 'not reused' && land_success === true)) {
        return false;
      }
      if (rocketFiring !== 'All' && (rocketFiring === 'reused' && fairings?.reused === false || rocketFiring === 'not reused' && fairings?.reused === true)) {
        return false;
      }
      return true;
    });

    return filtered;
  }

  @action
    getLaunch = async () => {
      const launchs = await getLaunchs();
      this.launchs = launchs;
      this.isLoading = true;
    };

  @action
    addHiddenColumns = (columns : string[]) => {
      this.hiddenColumns = columns;
    };
}

export default LaunchsStore;
