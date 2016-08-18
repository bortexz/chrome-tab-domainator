import { Component, OnInit } from '@angular/core';

import { TreeContainerComponent } from '../tree/tree.container'

@Component({
    moduleId: __filename,
    selector: 'td-my-app',
    templateUrl: 'app.component.html',
    directives: [TreeContainerComponent],
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
