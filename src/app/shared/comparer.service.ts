import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComparerService {

  public static byAllFields(first: any, second: any): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }
}
