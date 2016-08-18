import { Domain } from '../domain/domain'
import { Tab } from '../tab/tab'

let tldjs = require('tldjs')

export class DomainTree {
  private _domains:Array<Domain>

  constructor (data?:any) {}

  // Getters
  get domains() {
    return this._domains
  }

  get flattenedTabs() {
    return this._domains.reduce((arr:any, elem:any) => {
      elem.tabs.forEach((tab:any) => arr.push(tab));
      return arr;
    }, []);
  }

  // ""Constructors""
  fromChromeTabs(data: Array<any>) {
    this._domains =  data.reduce((arr: Array<any>, item: any) => {
        let domain = tldjs.getDomain(item.url) || 'Other'
        let parent = arr.find(elem => elem.domain === domain)

        if (!parent) {
          let obj = new Domain(domain, new Array<Tab>())
          arr.push(obj);
          parent = obj
        }
        let child = new Tab(item.id, item.title, item.url);
        parent.tabs.push(child)
        return arr
      }, [])
      return this
  }

  fromDomainArray(domArr: Array<Domain>) {
    this._domains = domArr;
    return this
  }

  _getDomainByTabId (tabId: Number) {
    return this._domains.find(elem => {
      return !!(elem.tabs.find(tabElem => tabElem.tabid === tabId));
    })
  }

  // CRUD Actions
  removeTab(tabid:Number) {
    let domain = this._getDomainByTabId(tabid);
    if (domain) {
      domain.removeTab(tabid);
      if (domain.tabs.length === 0) {
        this._domains.splice(this._domains.indexOf(domain), 1)
      }
    }
  }

  addTab(tab:any) {
    console.log('adding new tab!')
    let tabDomain = tldjs.getDomain(tab.url) || 'Other';
    let domain = this._domains.find(dom => dom.domain === tabDomain);

    let tabObj = new Tab(tab.id, tab.title, tab.url);
    if (!domain) {
      domain = new Domain(tabDomain, [tabObj])
    } else {
      domain.addTab(tabObj);
    }
  }

  updatedTab(data:any) {
    console.log('updatedTab!', data);
    let domain = this._getDomainByTabId(data.tabId);

    if (data.changeInfo.url) {

      if (domain) {
        this.removeTab(data.tabId);
      }

      let newTab = new Tab(data.tab.id, data.tab.title, data.tab.url);

      let newDomain = tldjs.getDomain(data.tab.url) || 'Other';
      let domainObj = this._domains.find(elem => elem.domain === newDomain);
      if (domainObj) {
        domainObj.addTab(newTab);
      } else {
        let newDomainObj = new Domain(newDomain, [newTab]);
        this._domains.push(newDomainObj);
      }
    } else if (data.changeInfo.title) {
      if (domain) {
        domain.tabs.find(tabElm => tabElm.tabid === data.tabId).title = data.tab.title;
      }
    }
  }
}
