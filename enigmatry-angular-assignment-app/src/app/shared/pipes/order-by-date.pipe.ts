import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
  transform(items: any[], field: string, order: 'asc' | 'desc' = 'desc'): any[] {
    if (!items || !field) {
      return items;
    }

    return items.sort((a, b) => {
      const dateA = new Date(a[field]);
      const dateB = new Date(b[field]);
      return order === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }
}