import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatedData'
})
export class FormatedDataPipe implements PipeTransform {

  transform(date: string): unknown {
    return moment(date).format("DD.MM.YYYY, hh:mm");
  }

}
