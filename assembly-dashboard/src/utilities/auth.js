import { DateTime } from 'luxon';
import storageManager from './storage';
const authKey = 'tacoShiftEnd';

export default {
  /** 
   * will execute callback always. difference in seconds returned when authenticated.
  */
  checkIfAuthenticated: (callback) => {
    let currentDT = DateTime.local();
    let userStartDT = DateTime.fromISO(storageManager.getItem(authKey));

    if (!storageManager.checkIfExists(authKey) || currentDT > userStartDT) {
      callback();
    } else {
      callback(currentDT.diff(userStartDT, 'seconds').as('seconds'));
    }
  },
  authorize: () => {
    storageManager.setItem(authKey, DateTime.local().plus({ minutes: 15 }).toISO());
    return storageManager.getItem(authKey);
  }
};