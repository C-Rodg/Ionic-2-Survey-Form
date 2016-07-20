import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SubmitService} from './providers/submit-service/submit-service';
import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [JSONP_PROVIDERS, SubmitService],
  config: {
    mode: 'md'
  } // http://ionicframework.com/docs/v2/api/config/Config/
  
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
