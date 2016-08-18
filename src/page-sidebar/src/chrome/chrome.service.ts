import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx'

declare var chrome: any;

interface BgMessage {
  type: string;
  data: any;
}

@Injectable()
export class ChromeService {
  constructor(private zone: NgZone){}

  private port = chrome.runtime.connect({name: "domain-tree"});

  public messageObserver:Observable<BgMessage> =
    Observable.create((observer:any) => {
      this.port.onMessage.addListener((msg: BgMessage) => {
        // chrome messages arrive outside ng2 default zone.
        this.zone.run(() => {
          observer.next(msg);
        })
      });
    })

  public postMessage(message: Object) {
    this.port.postMessage(message);
  }

  public sendMessage(message: Object, cb: Function) {
    chrome.runtime.sendMessage(message, (response:any) => {
      this.zone.run(() => {
        cb(response);
      })
    })
  }

}
