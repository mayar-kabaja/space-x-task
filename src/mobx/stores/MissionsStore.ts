/* eslint-disable class-methods-use-this */
import {
  observable, action, makeObservable, runInAction,
} from 'mobx';
import { Mission } from '../../utils';
import { getMission } from '../api';

class MissionsStore {
  @observable missions: Mission[] = [];

  @observable isLoading = false;

  constructor() {
    makeObservable(this);
  }

  @action
    addMissions = async () => {
      const missions = await getMission();
      runInAction(() => {
        this.missions = missions;
        this.isLoading = true;
      });
    };
}

export default MissionsStore;
