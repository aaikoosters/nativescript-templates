import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RouterExtensions } from "@nativescript/angular";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient, private router: RouterExtensions) { }

  signIn(email: string, password: string) {
    console.log(`auth service signin pressed: ${email} + ${password}`);
    this.router.navigate(["/home"], { clearHistory: true });
  }
  signUp(email: string, password: string) {
    console.log(`auth service singup pressed: ${email} + ${password}`);
    // route to signup page?
  }
}
