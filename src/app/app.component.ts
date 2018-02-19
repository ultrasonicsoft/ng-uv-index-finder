import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenWeatherModel } from './open-weaather-data.model';
import { OpenUVModel } from './openuv.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uvIndexOpenWeatherMap: OpenWeatherModel;
  uvIndexOpenUV: OpenUVModel;
  userPostion: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.findMe();
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
    this.httpClient.get<OpenWeatherModel>(url).subscribe(data => {            
      this.uvIndexOpenWeatherMap = data;      
    })
  }

  showUVIndexOpenUV(position) {
    let timestamp = new Date();
    let url2 = `https://api.openuv.io/api/v1/uv?lat=${position.coords.latitude}&lng=${position.coords.longitude}&dt=${timestamp.toISOString()}`;   

    let headers = new HttpHeaders({
      'x-access-token': '39a495a755df7245e26866211e43c05a'
    })
    this.httpClient.get<OpenUVModel>(url2, { headers }).subscribe(data => {
      this.uvIndexOpenUV = data;      
    })
  }

  refresh() {
    this.showUVIndex(this.userPostion);
    this.showUVIndexOpenUV(this.userPostion);
  }
}
