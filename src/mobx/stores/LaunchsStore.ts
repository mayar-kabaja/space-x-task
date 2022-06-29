import { observable, action } from 'mobx';
import { getLaunchs, getOneLaunch } from '../api';

class LaunchsStore {
  @observable launchs: object[] = [];

  @observable filterLaunchs: object[] = [];

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
