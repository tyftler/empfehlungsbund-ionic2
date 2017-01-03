import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {
  constructor(
    private http: Http
  ) {

  }

  searchJobs(query, location) {
    var url = 'https://api.empfehlungsbund.de/api/v2/jobs/search.json?q=' + encodeURI(query) + '&o=' + encodeURI(location);
    return this.http.get(url).map(res => res.json());
  }

  reverseGeocode(latitude, longitude) {
    var url = 'https://api.empfehlungsbund.de/api/v2/utilities/reverse_geocomplete.json?api_key=API_KEY_REMOVED&lat=' + encodeURI(latitude) + '&lon=' + encodeURI(longitude);
    return this.http.get(url).map(res => res.json());
  }
}
