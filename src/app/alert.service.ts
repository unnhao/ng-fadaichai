import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  pop: (message: string) => void = (message: string): void => {
    console.warn('null pop');
  }

  subscribe(pop) {
    this.pop = pop;
  }

  alert(message: string) {
    this.pop(message);
  }
}
