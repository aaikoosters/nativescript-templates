import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import {
  DrawerTransitionBase,
  RadSideDrawer,
} from "nativescript-ui-sidedrawer";
import { UIService } from "./shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // allows to access template
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  // old
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(
    private router: RouterExtensions,
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private authService: AuthService
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggleDrawerState();
      }
      this.uiService.setRootVCRef(this.vcRef);
    });
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.uiService.toggleDrawer();
    this.router.navigate([navItemRoute], { clearHistory: true });
  }

  onLogout() {
    this.uiService.toggleDrawer();
    // this.authService.logout();
    this.router.navigate(['/auth'], { clearHistory: true });
  }
}
