import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadstatus'
})
export class LeadstatusPipe implements PipeTransform {

  transform(leadstatus: string): string {

    switch (leadstatus) {
      case 'contacted': leadstatus = 'Contacted'
      break;
      case 'replyreceived': leadstatus = 'Reply received'
      break;
      case 'interview': leadstatus = 'Interview'
      break;
      case 'done': leadstatus = 'Done'
      break;
      default: leadstatus = 'Invalid status';
    };

    return leadstatus;
  }
}
