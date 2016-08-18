import { Component, OnInit, Input } from '@angular/core';
import { Tab } from './tab'

@Component({
  moduleId: __filename,
  selector: 'td-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() tab: Tab;
  @Input() closeButton: Function;
  @Input() tabClick: Function;

  constructor() { }

  ngOnInit() { }

}
