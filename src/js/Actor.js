import {
    enqueueMessage
} from './actions/vm';
import store from './store';

class Actor {
  constructor(...args) {
    this._state = "receive";
    this._args = args;
  }
  send(targetPid, ...args) {
    store.dispatch(enqueueMessage(this.pid, targetPid, args));
  }
  become(listening) {
    this._state = listening;
  }
  toString() {
    var that = {}
    for (let key of Object.keys(this)) {
      that[key] = this[key];
    }
    return this.constructor.name + ' ' + JSON.stringify(that);
  }

  clone() {
    var that = new this.constructor(...this.args);
    for (let key of Object.keys(this)) {
      that[key] = JSON.parse(JSON.stringify(this[key]));
    }
    return that;
  }

  exit() {
    this._state = "exit";
    this._down = store.getState().vm.clock;
  }
}

export default Actor;