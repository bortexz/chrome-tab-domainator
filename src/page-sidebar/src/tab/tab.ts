export class Tab {
  constructor(
    private _tabid: Number,
    private _title: string,
    private _url: string
  ) {}

  get tabid () { return this._tabid }
  get title () { return this._title }
  get url () { return this._url }

  set tabid (tabId) { this._tabid = tabId }
  set title (title) { this._title = title }
  set url (url) { this._url = url }

}
