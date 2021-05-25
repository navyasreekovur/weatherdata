import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { map, filter, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class weatherService {
  private apiURL :string='';
  private apiURLFor5Days:string='';
  private weatherData:[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient:HttpClient) 
  {
  
   }
   getAll():Observable<any>
   {
    return this.httpClient.get<any>(this.apiURL)
    .pipe(catchError(this.processError))
  
  }
  processError(err:any)
   {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }
 getWeatherData(cityName:string):Observable<any>
 {
   console.log('cityNAme'+cityName);
   this.apiURL= `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3d8b309701a13f65b660fa2c64cdc517`;
  return this.httpClient.get<any>(this.apiURL)
    .pipe(catchError(this.processError))
 }
 getWeatherDataFor5Days(cityName:String):Observable<any>
 { debugger;
  console.log('cityNAme'+cityName);
  this.apiURLFor5Days= `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3d8b309701a13f65b660fa2c64cdc517`;
 return this.httpClient.get<any>(this.apiURLFor5Days)

   .pipe(
    map(heroes => heroes['list']
    .filter((hero: any) =>{
       return new Date(hero.dt_txt).getDate()<new Date().getDate()+6 && new Date(hero.dt_txt).getHours()==9;
    })
    ),  
    catchError(this.processError))
 }
}
