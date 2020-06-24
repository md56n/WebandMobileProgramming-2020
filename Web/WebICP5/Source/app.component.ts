import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  public task: string;
  public seconds;

  constructor() {
    this.task = '';
  }

  submitNewItem(task: string){
    this.task = task;
    console.log('task 1: ', task);
  }

  startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
      console.log(counter);
      counter--;

      if (counter < 0 ) {
        clearInterval(interval);
        console.log('Ding!');
      }
    }, 1000);
  }

}
