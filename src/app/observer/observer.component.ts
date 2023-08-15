import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent {

  @Input() viewVector: boolean = true;

}
