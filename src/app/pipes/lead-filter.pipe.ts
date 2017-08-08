import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadFilter'
})
export class LeadFilterPipe implements PipeTransform {

    transform(items: any[], value: string): any {
      if (!items) { return []; }
      if (!value) { return items; }

      const pattern = new RegExp(value, 'i');

      const companies = items.filter(it => {
        return it.company.match(pattern);
      });

      const titles = items.filter(it => {
        return it.jobtitle.match(pattern);
      });

      const contactmails = items.filter(it => {
        return it.contactperson.email.match(pattern);
      });

      const contactpeople = items.filter(it => {
        return it.contactperson.name.match(pattern);
      });

      const searchResults = [...companies, ...titles, ...contactmails, ...contactpeople];

      const returnArr = [];

      searchResults.forEach(function(result, i) {
        if (!returnArr.includes(result)) {
          returnArr.push(result);
        }
      });

      return returnArr;
    }

}
