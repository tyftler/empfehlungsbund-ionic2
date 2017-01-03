import {Page, NavController, Modal, ViewController, Alert, Loading} from 'ionic-angular';
import {SettingsService} from '../services/settings';
import {ApiService} from '../services/api';


@Page({
  templateUrl: 'build/pages/guide/guide.html',
})
export class GuidePage {
  private query: any
  private location: any

  constructor(
    private nav: NavController,
    private settingsService: SettingsService,
    private apiService: ApiService,
    private viewCtrl: ViewController
  ) {
    this.query = 'Ruby';
    this.location = 'Dresden';
  }

  getLocation() {
    let loading = Loading.create({content: 'Laden...'});
    this.nav.present(loading);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.apiService.reverseGeocode(position.coords.latitude, position.coords.longitude).subscribe(
          (data) => {
            loading.dismiss();

            this.location = data.city;

            let alert = Alert.create({
              title: 'Standortermittlung',
              subTitle: 'Ermittelter Standort: ' + data.city,
              buttons: ['OK']
            });
            this.nav.present(alert);
          },
          (err) => {
            console.error(err);
            loading.dismiss();

            let alert = Alert.create({
              title: 'Standortermittlung',
              subTitle: 'Ihr Standort konnte leider nicht ermittelt werden.',
              buttons: ['OK']
            });
            this.nav.present(alert);
          }
        );
      },
      (err) => {
        console.error(err);
        loading.dismiss();

        let alert = Alert.create({
          title: 'Standortermittlung',
          subTitle: 'Ihr Standort konnte leider nicht ermittelt werden.',
          buttons: ['OK']
        });
        this.nav.present(alert);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000
      }
    )
  }

  saveSettings() {
    this.settingsService.guideCompleted = true;
    this.settingsService.query = this.query;
    this.settingsService.location = this.location;
    this.viewCtrl.dismiss();
  }
}
