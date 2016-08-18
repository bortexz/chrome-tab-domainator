import { Tab } from '../tab/tab'

export class Domain {
  private _domain: string
  private _tabs: Array<Tab>
  private _favicon: string

  constructor(domain:string, tabs:Array<Tab>) {
    this._domain = domain
    this._tabs = tabs
  }

  // Get/set
  public get domain() : string {
    return this._domain
  }

  public get tabs() : Array<Tab> {
    return this._tabs
  }

  public get favicon() : string {
    return this._favicon
  }

  public set favicon(url : string) {
    this._favicon = url;
  }

  // Methods
  addTab (tab: Tab) {
    this._tabs.push(tab);
  }

  removeTab (tabid: Number) {
    this._tabs.splice(
      this._tabs.findIndex(elem => elem.tabid === tabid), 1)
  }

  // modifyTab (tabid: Number, props: any) {

  // }
}
