import { Pipe, PipeTransform } from '@angular/core';
import { DomainTree } from './tree'

@Pipe({name: 'tdTreeSearch'})
export class TreeSearchPipe implements PipeTransform {
  transform(value: DomainTree, query: string): DomainTree {
    if (query === '') {
      return value
    }

    let newArr = value.domains.reduce((arr:any, elem:any) => {
      let tabs = elem.tabs.filter((tab:any) => {
        return tab.url.indexOf(query) !== -1
      })
      if (tabs.length > 0) {
        arr.push(elem)
      }
      return arr;
    }, [])

    return new DomainTree().fromDomainArray(newArr);
  }
}
