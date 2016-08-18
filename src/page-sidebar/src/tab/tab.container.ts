import { Component, OnInit, Input } from '@angular/core';
import { ChromeService } from '../chrome/chrome.service'

import { Tab } from './tab'
import { TabComponent } from './tab.component'


@Component({
  moduleId: __filename,
  selector: 'td-tab-container',
  directives: [TabComponent],
  template: `<td-tab [tab]='tab' [tabClick]='goToTab()' [closeButton]='closeTabWrapper()'></td-tab>`
})
export class TabContainerComponent implements OnInit {
  @Input() tab:Tab;

  constructor(private _chromeService: ChromeService) { }

  ngOnInit() { }

  closeTabWrapper() {
    return () => {
      this._chromeService.postMessage({type: 'close-tab', data: this.tab})
    }
  }

  goToTab() {
    return () => {
      this._chromeService.postMessage({type: 'select-tab', data: this.tab})
    }
  }

}
