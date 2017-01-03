import {Page} from 'ionic-angular';
import {DummyTabPage} from '../dummy-tab/dummy-tab';


@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html'
})
export class DashboardPage {
  private favoritesPage: any
  private interestingPage: any
  private uninterestingPage: any
  private applicationsPage: any
  private profilePage: any
  private settingsPage: any

  constructor() {
    this.favoritesPage = DummyTabPage;
    this.interestingPage = DummyTabPage;
    this.uninterestingPage = DummyTabPage;
    this.applicationsPage = DummyTabPage;
    this.profilePage = DummyTabPage;
    this.settingsPage = DummyTabPage;
  }
}
