import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

import { MapService } from "../services/map.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  maps: any;

  addingMap = false;

  constructor(
    private router: Router, 
    private mapService: MapService,
    private auth: AuthService
    ) {}

  ngOnInit() {
    this.auth.getUser().subscribe((response) => {
      console.log('response ', response)
    })
  }

  addMap(): void {
    this.addingMap = true;
  }

  gotoSelectedMap(id) {
    this.router.navigateByUrl(`/map/${id}`);
  }

  getMaps() {
    this.mapService.getUserMaps().subscribe((maps) => {
      this.maps = [...maps];
    });
  }

  isAddingMap($event): void {
    this.addingMap = $event;
    if (!this.addingMap) {
      this.getMaps();
    }
  }

  deleteMap(id): void {
    console.log(`delete map ${id}, not yet implemented!`);
  }

  cancel(): void {
    this.addingMap = false;
  }
}
