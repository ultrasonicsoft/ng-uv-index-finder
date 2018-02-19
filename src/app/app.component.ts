import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  uvIndex: number;
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {    
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showUVIndex(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showUVIndex(position) {

    let url = `https://api.openweathermap.org/data/2.5/uvi?appid=715fb6755c8593cd50a03d7189d750dc&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    this.httpClient.get(url).subscribe(data => {
      this.uvIndex = (<any>data).value;
      console.log(data);
    })    
  }
}
