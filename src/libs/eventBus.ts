type Callback = (params?: any) => void;

interface EventMap {
  [index: string]: Callback[],
}

class EventBus {
  private static _ins: EventBus;

  static get instance(): EventBus {
    return this._ins || (this._ins = new EventBus());
  }

  eventMap: EventMap = {};

  constructor() {
    this.eventMap = {};
  }

  on(type: string, func: Callback) {
    if (!(func instanceof Function)) {
      throw new Error('callback must be a function');
    }

    if (!this.eventMap[type]) {
      this.eventMap[type] = [];
    }

    this.eventMap[type].push(func);
  }

  emit(type: string, params?: any) {
    if (!(this.eventMap[type])) return;
    this.eventMap[type].forEach((handle, index) => {
      handle(params)
    })
  }

  off(type: string, func: Callback) {
    if (this.eventMap[type]) {
      let index = this.eventMap[type].indexOf(func); if (index > 0) {
        this.eventMap[type].splice(index, 1)
      }
    }
  }
}

export default EventBus;
