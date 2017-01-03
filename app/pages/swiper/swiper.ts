import {Page, NavController, NavParams, Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {SettingsService} from '../services/settings';
import {DashboardPage} from '../dashboard/dashboard';


@Page({
  templateUrl: 'build/pages/swiper/swiper.html'
})
export class SwiperPage {
  private jobs: any
  private jobIndex: number
  private swiperOptions: any
  private carouselOptions: any

  @ViewChild('swiper') swiper: Slides;
  @ViewChild('carousel') carousel: Slides;

  constructor(
    private nav: NavController,
    private settingsService: SettingsService,
    navParams: NavParams
  ) {
    this.jobs = navParams.get('jobs');
    this.jobIndex = -1;

    var duration = 500;
    var threshold = 0.2;

    this.swiperOptions = {
      direction: 'vertical',
      speed: duration,
      initialSlide: 1,
      longSwipesRatio: threshold,
      onProgress: function(swiper, progress) {
        var slideProgress = (progress - 0.5) * 2;
        var distance = slideProgress * (swiper.height / 2);

        if (progress < 0.5) {
          document.getElementById('uninterestingLabel').style.transform = 'translateY(' + distance + 'px)';
        } else {
          document.getElementById('interestingLabel').style.transform = 'translateY(' + distance + 'px)';
        }
      },
      onTransitionStart(swiper){
        // lock swiper during transition that it cannot be interfered with
        swiper.params.onlyExternal = true;
        swiper.params.noSwiping = true;

        // start label transitions

        // move up (passed threshold)
        if (swiper.progress < 0.5 * (1 - threshold)) {
            document.getElementById('uninterestingLabel').style.transform = 'translateY(-' + (swiper.height / 2) + 'px)';
            document.getElementById('uninterestingLabel').style.transition = 'transform ' + duration + 'ms linear';
        // move down (passed threshold)
        } else if (swiper.progress > 0.5 * (1 + threshold)) {
            document.getElementById('interestingLabel').style.transform = 'translateY(' + (swiper.height / 2) + 'px)';
            document.getElementById('interestingLabel').style.transition = 'transform ' + duration + 'ms linear';
        // move back to center after moving up (missed threshold)
        } else if (swiper.progress < 0.5) {
            document.getElementById('uninterestingLabel').style.transform = 'translateY(0px)';
            document.getElementById('uninterestingLabel').style.transition = 'transform ' + duration + 'ms linear';
        // move back to center after moving down (missed threshold)
        } else {
            document.getElementById('interestingLabel').style.transform = 'translateY(0px)';
            document.getElementById('interestingLabel').style.transition = 'transform ' + duration + 'ms linear';
        }
      },
      onTransitionEnd(swiper) {
        // unlock swiper after transition
        if (swiper.activeIndex == 1) {
          swiper.params.onlyExternal = false;
          swiper.params.noSwiping = false;
        }

        // remove label transitions
        document.getElementById('uninterestingLabel').style.transition = 'none';
        document.getElementById('interestingLabel').style.transition = 'none';
      }
    };
    this.carouselOptions = {
      pager: true,
      spaceBetween: 20
    };

    this.nextJob();
  }

  openDashboard() {
    this.nav.push(DashboardPage);
  }

  nextJob() {
    if (typeof this.jobs[this.jobIndex + 1] == 'undefined') {
      this.nav.pop({animate: false});
      return;
    }

    this.jobIndex++;
  }

  onSwiped() {
    if (this.swiper.getActiveIndex() == 1) {
      return;
    }

    console.log(this.jobs[this.jobIndex].id + ' is ' + (this.swiper.getActiveIndex() == 0 ? 'uninteresting' : 'interesting'));

    if (this.swiper.getActiveIndex() == 0) {
      this.settingsService.ignoredJobs.push(this.jobs[this.jobIndex].id);
    }

    window.setTimeout(() => {
      this.carousel.slideTo(0, 0, true);
      this.swiper.slideTo(1, 0, true);
      this.nextJob();
    }, 500);
  }
}
