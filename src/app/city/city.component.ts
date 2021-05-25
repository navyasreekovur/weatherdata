import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { weatherService } from '../weather.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
city:string="";
weatherData:[]=[];
dataSource = this.weatherData;
  constructor(  private activatedroute: ActivatedRoute,private weatherService:weatherService) {

   }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(data => {
      console.log(data['name']);
      this.city=data['name']
      this.weatherService.getWeatherDataFor5Days(data['name'])
     
      .subscribe(weatherData =>{
    console.log(weatherData);
    this.weatherData=weatherData;
    })

    })
  }

}
