import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { LoginComponent } from "./admin/login/login.component";
import { HomeComponent } from "./home/home.component";

import { RouteGuardService as RouteGuard } from './services/auth/route-guard.service';

/////Login has been switched to the form component for development purposes
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "log-in", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [RouteGuard]  },
  { path: "map/:id", component: MapComponent, canActivate: [RouteGuard]  },
  { path: "login", component: LoginComponent, canActivate: [RouteGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
