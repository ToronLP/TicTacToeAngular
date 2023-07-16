import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'TicTacToeAngular';
  
  updateAvailable: boolean;
  installPrompt = event;
  installButton = document.querySelector("#install");

  constructor(private update: SwUpdate){
    this.updateAvailable = false;
    this.updateClient();
  }

  updateClient(){
    if(!this.update.isEnabled){
      console.log("Not enabled!");
      return;
    }

    this.update.available.subscribe((event) => {
      console.log('current', event.current, 'available', event.available);
      this.updateAvailable = true;
    });

    this.update.activated.subscribe((event) => {
      console.log('previous', event.previous, 'current', event.current);
    });
  }

  runUpdate(){
    this.update.activateUpdate().then(() => location.reload());
  }
}
