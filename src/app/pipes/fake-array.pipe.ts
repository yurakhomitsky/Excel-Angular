import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fakeArray'
})
export class FakeArrayPipe implements PipeTransform {

  transform(value: number, ...args: any[]): Array<number> {
    const res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }
}

