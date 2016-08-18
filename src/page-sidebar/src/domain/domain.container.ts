import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http'

import { ChromeService } from '../chrome/chrome.service'

import { Domain } from './domain'
import { DomainComponent } from './domain.component'

@Component({
  moduleId: __filename,
  selector: 'td-domain-container',
  directives: [DomainComponent],
  template: `<td-domain [domain]='domain' [closeButton]='closeDomainTabsWrapper()'></td-domain>`
})
export class DomainContainerComponent implements OnInit {
  @Input() domain: Domain;
  faviconRootUrl: string = 'https://iconserver.bertofer.me/'

  constructor(private _http: Http, private _chromeService: ChromeService) {}

  ngOnInit() {
    this._http.get(this.getFaviconUrl()).subscribe(
      data => this.domain.favicon = data.url,
      err => console.log(err)
    )
  }

  closeDomainTabsWrapper() {
    return () => {
      console.log('sent message close-tabs', this.domain.tabs);
      this._chromeService.postMessage({type: 'close-tabs', data: this.domain.tabs});
    }
  }

  getFaviconUrl () {
    return `${this.faviconRootUrl}icon?url=${this.domain.domain}&size=32`
  }
}
