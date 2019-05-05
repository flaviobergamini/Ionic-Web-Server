import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { WebServer } from '@ionic-native/web-server/ngx';
import { WebServer } from '@ionic-native/web-server';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, webServer: WebServer) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      webServer.onRequest().subscribe(request => {
        const response = {
          status: 200,
          body: 'Working!',
          headers: {
            'Content-Type': 'text/html'
          }
        };
        webServer.sendResponse(request.requestId, response);
      });
      webServer.start();
    });
  }
}

