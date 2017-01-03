import {Injectable} from '@angular/core';


@Injectable()
export class SettingsService {
  guideCompleted: boolean
  query: string
  location: string
  ignoredJobs: any

  constructor() {
    this.guideCompleted = false;
    this.query = '';
    this.location = '';
    this.ignoredJobs = [];
  }

  // local storage could be added here
}
