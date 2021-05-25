import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: 'home',
    
    component: HomeComponent, 
    children: [
      {
        path: 'city/:name', 
        component: CityComponent,
        pathMatch:'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
