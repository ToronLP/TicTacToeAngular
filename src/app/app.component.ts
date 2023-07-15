import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TicTacToeAngular';

  constructor(private update: SwUpdate){
    this.updateClient();
  }

  updateClient(){
    if(!this.update.isEnabled){
      console.log("Not enabled!");
      return;
    }

    this.update.available.subscribe((event) => {
      console.log('current', event.current, 'available', event.available);
      if(confirm('update available for the app please confirm')){
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log('previous', event.previous, 'current', event.current);
    });
  }
}
