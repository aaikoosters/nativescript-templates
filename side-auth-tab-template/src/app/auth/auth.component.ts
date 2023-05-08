import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core";

import { AuthService } from "./auth.service";

@Component({
  selector: "ns-auth",
  templateUrl: "./auth.component.html",
  moduleId: module.id,
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  emailIsValid = true;
  passwordIsValid = true;
  isLogin = false;

  // properties to get live changes from action
  @ViewChild("emailElement") emailElement: ElementRef<TextField>;
  @ViewChild("passwordElement") passwordElement: ElementRef<TextField>;

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) {}

  setInputValidator() {
    this.authForm = new FormGroup({
      // 1 starting value, 2 object configure
      emailFormControl: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email],
      }),
      passwordFormControl: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });

    this.authForm.get("emailFormControl").statusChanges.subscribe((status) => {
      this.emailIsValid = status === "VALID";
    });
    this.authForm
      .get("passwordFormControl")
      .statusChanges.subscribe((status) => {
        this.passwordIsValid = status === "VALID";
      });
  }

  ngOnInit() {
    // set input fields
    this.setInputValidator();
  }

  onDone() {
    // .focus -> don't know how the order
    this.emailElement.nativeElement.focus();
    this.passwordElement.nativeElement.focus();
    this.passwordElement.nativeElement.dismissSoftInput();
  }

  onSubmit() {
    // remove focus and disable keyboard
    this.onDone();

    // // hard check if form is valid
    if (!this.authForm.valid) {
      return;
    }

    this.onSignIn();
  }

  onSignIn() {
    console.log("login pressed");

    // get values of inputs
    const email = this.Email;
    const password = this.Password;

    // auth service login
    this.authService.signIn(email, password);
    this.router.navigate(["/home"], { clearHistory: true });
  }

  onSingUp() {
    console.log("singup pressed");
    // get values of inputs
    const email = this.Email;
    const password = this.Password;

    // auth service login
    this.authService.signUp(email, password);
    this.router.navigate(["/home"], { clearHistory: true });
  }

  // getters
  get Email() {
    return this.authForm.get("emailFormControl").value;
  }

  get Password() {
    return this.authForm.get("passwordFormControl").value;
  }
}
