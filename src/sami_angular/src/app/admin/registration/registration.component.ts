import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  waitingForResponse: boolean;
  errorMessage: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.waitingForResponse = false;
    this.errorMessage = "";
  }

  registerUser(
    username: HTMLInputElement,
    password: HTMLInputElement,
    email?: HTMLInputElement
  ) {
    if (username.value.length < 1 || password.value.length < 1) {
      alert("Username and Password are required");
      return;
    }
    this.waitingForResponse = true;
    this.errorMessage = "";
    this.auth.registerNewUser(username.value, password.value, email.value)
      .subscribe(response => {
        this.router.navigateByUrl("/home");
      });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}