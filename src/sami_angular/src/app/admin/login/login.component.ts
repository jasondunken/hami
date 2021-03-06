import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loggingIn: boolean; // state variable for progress indicatior
  registeringUser = false; // flag for registration panel
  errorMessage: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loggingIn = false;
    this.errorMessage = "";
  }

  login(username: HTMLInputElement, password: HTMLInputElement): void {
    if (username.value.length < 1 || password.value.length < 1) {
      alert("Username and Password are required");
      return;
    }
    this.loggingIn = true;
    this.auth.login(username.value, password.value).subscribe((response) => {
      this.loggingIn = false;
      if (response.error) {
        this.errorMessage = response.error;
      } else {
        this.router.navigateByUrl("/home");
      }
    });
  }

  register(): void {
    this.registeringUser = true;
  }

  // listening for an event from resistration component
  cancelRegister(): void {
    this.registeringUser = false;
  }

  test() {
    this.auth.test().subscribe((response) => {
      console.log("response: ", response);
    });  
  }
  test2() {
    this.auth.test2().subscribe((response) => {
      console.log("response: ", response);
    });  
  }
}
