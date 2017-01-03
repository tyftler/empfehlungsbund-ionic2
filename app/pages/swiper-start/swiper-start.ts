import {Page, NavController, Modal, Alert, Loading} from 'ionic-angular';
import {SettingsService} from '../services/settings';
import {ApiService} from '../services/api';
import {DashboardPage} from '../dashboard/dashboard';
import {GuidePage} from '../guide/guide';
import {SwiperPage} from '../swiper/swiper';


@Page({
  templateUrl: 'build/pages/swiper-start/swiper-start.html'
})
export class SwiperStartPage {
  private firstIteration: boolean

  constructor(
    private nav: NavController,
    private settingsService: SettingsService,
    private apiService: ApiService
  ) {
    this.firstIteration = true;
  }

  openDashboard() {
    this.nav.push(DashboardPage);
  }

  openSwiper() {
    let loading = Loading.create({content: 'Laden...'});
    this.nav.present(loading);

    this.apiService.searchJobs(this.settingsService.query, this.settingsService.location).subscribe(
      (data) => {
        loading.dismiss();

        let jobs = [];
        for (let job of data.jobs) {
          if (this.settingsService.ignoredJobs.indexOf(job.id) == -1) {
            jobs.push(job);
          }
        }

        if (jobs.length > 0) {
          this.nav.push(SwiperPage, {jobs: jobs}, {animate: false});
        }

        this.firstIteration = false;
      },
      (err) => {
        console.error(err);
        loading.dismiss();

        let alert = Alert.create({
          title: 'Jobsuche',
          subTitle: 'Die aktuellen Stellenangebote konnten leider nicht abgerufen werden.',
          buttons: ['OK']
        });
        this.nav.present(alert);
      }
    );
  }

  onPageDidEnter() {
    if (!this.settingsService.guideCompleted) {
      let modal = Modal.create(GuidePage);
      this.nav.present(modal);
    } else if (this.firstIteration) {
      this.openSwiper();
    }
  }
}
