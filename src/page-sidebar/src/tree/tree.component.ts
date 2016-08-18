import { Component, OnInit, Input } from '@angular/core';
import { DomainTree } from './tree'

import { DomainContainerComponent } from '../domain/domain.container'
// Move to tab later

@Component({
  moduleId: __filename,
  selector: 'td-tree',
  directives: [DomainContainerComponent],
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() tree: DomainTree;

  constructor() {}

  ngOnInit() {}

  getDomains () {
    return this.tree ? this.tree.domains : []
  }
}
