import { Pipe, PipeTransform } from '@angular/core';
import { DomainTree } from './tree'
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
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
