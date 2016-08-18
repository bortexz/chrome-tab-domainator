import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChromeService } from '../chrome/chrome.service';
import { DomainTree } from './tree'

import { TreeSearchPipe } from './tree.search.pipe'

import { TreeComponent } from './tree.component';

@Component({
  selector: 'td-tree-container',
  directives: [TreeComponent],
  templateUrl: 'tree.container.html',
  styleUrls: ['tree.container.css'],
  pipes: [TreeSearchPipe]
})

export class TreeContainerComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  tree: DomainTree;
  searchQuery: string = '';

  constructor(
    private _chromeService: ChromeService
  ) { }

  ngOnInit() {
    // Focus search input for direct typing
    this.searchInput.nativeElement.focus();

    // Get tabs
    this._chromeService.postMessage({type: 'get-tabs'})

    // subscribe to messages
    this._chromeService.messageObserver
      .subscribe(message => {
        switch(message.type) {
          case 'current-tabs':
            this.tree = new DomainTree().fromChromeTabs(message.data);
            break;
          case 'closed-tab':
            this.tree.removeTab(message.data.tabid);
            break;
          case 'new-tab':
            this.tree.addTab(message.data);
            break;
          case 'update-tab':
            this.tree.updatedTab(message.data);
            break;
          case 'replace-tab':
            this.tree.removeTab(message.data.removedTabId);
            this._chromeService.sendMessage(
              {type: 'get-tab', data: message.data.addedTabId}, (response: any) => {
                if (response) {
                  this.tree.addTab(response);
                }
              }
            )
        }
    })
  }

  orderTabs() {
    let arrayTabIds = this.tree.flattenedTabs.map((tab:any) => tab.tabid);
    this._chromeService.postMessage({type: 'order-tabs', data: arrayTabIds});
  }

}
