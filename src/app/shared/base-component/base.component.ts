import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  subscribers: any = {}

  constructor() { }
  
  beautify(str: string) {
    return str ? str.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
  }

  ngOnDestroy(): void {
    Object.values(this.subscribers).forEach(subscriber => {
      if(subscriber instanceof Subscriber) {
        subscriber.unsubscribe();
      }
    });
  }
}
