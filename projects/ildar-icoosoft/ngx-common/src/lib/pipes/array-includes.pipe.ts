import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayIncludes'
})
export class ArrayIncludesPipe implements PipeTransform {

  transform(sourceArray: any[], searchElement: any): boolean {
    return sourceArray.includes(searchElement);
  }

}
