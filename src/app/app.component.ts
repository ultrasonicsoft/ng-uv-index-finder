import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uvIndexOpenWeatherMap: number;
  uvIndexOpenUV: number;

  userPostion: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPostion = position;
        this.showUVIndex(position);
        this.showUVIndexOpenUV(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showUVIndex(position) {
    let url = `https://api.openweathermap.org/data/2.5/uvi?appid=715fb6755c8593cd50a03d7189d750dc&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    this.httpClient.get(url).subscribe(data => {
      this.uvIndexOpenWeatherMap = (<any>data).value;
      console.log(data);
    })
  }

  showUVIndexOpenUV(position) {
    let timestamp = new Date().toString();
    console.log(timestamp);
    let url2 = `https://api.openuv.io/api/v1/uv?lat=${position.coords.latitude}&lng=${position.coords.longitude}&dt=2018-01-24T10:50:52.283Z`;
    let headers = new HttpHeaders({
      'x-access-token': '39a495a755df7245e26866211e43c05a'
    })
    this.httpClient.get(url2, { headers }).subscribe(data => {
      this.uvIndexOpenUV = (<any>data).value;
      console.log('OpenUV:' + data);
    })
  }

  refresh() {
    this.showUVIndex(this.userPostion);
    this.showUVIndexOpenUV(this.userPostion);
  }
}
