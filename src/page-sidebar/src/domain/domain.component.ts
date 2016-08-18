import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Domain } from './domain'

import { TabContainerComponent } from '../tab/tab.container'

@Component({
  moduleId: __filename,
  selector: 'td-domain',
  directives: [TabContainerComponent],
  templateUrl: 'domain.component.html',
  styleUrls: ['domain.component.css'],
  animations: [
    trigger('expandedState', [
      state('expanded', style({
        height: '*',
        borderTop: '1px solid rgba(0,0,0,0.2)'
      })),
      state('hidden', style({
        height: '0px',
        borderTop: '0px solid rgba(0,0,0,0.2)'
      })),
      transition('expanded => hidden', [
        animate('100ms ease-in')
      ]),
      transition('hidden => expanded', [
        animate('100ms ease-out')
      ])
    ])]
})
export class DomainComponent implements OnInit {
  @Input() domain: Domain;
  @Input() closeButton: Function;

  _expanded: boolean = false;
  expandedState: string = 'hidden';

  constructor() { }

  ngOnInit() {}

  toggleTabs () {
    this._expanded = !this._expanded;
    this.expandedState = this._expanded ? 'expanded' : 'hidden'
  }

  closeButtonClick(event:Event) {
    event.stopPropagation();
    this.closeButton();
  }

}
