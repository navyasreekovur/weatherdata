import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {weatherService} from '../weather.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities:any=[];
  data:any;
  citiesApiWeatherData:any=[];
  constructor(private httpClient:HttpClient,private weatherService:weatherService,private router:Router,public route: ActivatedRoute)
  {
  
  }
  ngOnInit(): void {
    this.httpClient.get("assets/cityData.json").subscribe(data =>{
     
      this.data = data;
      this.cities=this.data['List'];
      console.log(this.cities);
      for(let i=0;i<this.cities.length;i++)
      {
        this.weatherService.getWeatherData(this.cities[i]['name']).subscribe(data =>{
          console.log(data);
          this.citiesApiWeatherData.push(data) ;
          console.log('citiesApiWeatherData'+this.citiesApiWeatherData);
      })

    }
    })
  }
  checkWeather(city:string)
  {

  }
  getCityWeatherData(city:any){
    console.log(city.name);
    this.router.navigate(['./city',city['name']], {relativeTo: this.route});

  }
}
