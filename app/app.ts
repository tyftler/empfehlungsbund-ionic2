import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {SettingsService} from './pages/services/settings';
import {ApiService} from './pages/services/api';
import {SwiperStartPage} from './pages/swiper-start/swiper-start';


@App({
  template: '<ion-nav [root]="rootPage" swipe-back-enabled="false"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [SettingsService, ApiService]
})
class MyApp {
  rootPage: any = SwiperStartPage;

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
