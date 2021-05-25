import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { weatherService } from './weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  myData:any ;
  dataSource:any;
  cities:any=[];
 
   
   constructor(private weatherService:weatherService ,private router:Router,public route:ActivatedRoute)
   {
   
   }
   ngOnInit(): void {
     this.weatherService.getAll().subscribe((data:any)=>{
       this.myData=data;
       console.log('data'+(JSON.stringify(this.myData)));
     })
    
  
    }
    navigateToHome()
    {
      this.router.navigate(['home']);
    }
}
