import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { TabBarComponent } from "./tabbar/tabbar.component";
import { BrowseComponent } from "./browse/browse.component";
import { SearchComponent } from "./search/search.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("~/app/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("~/app/home/home.module").then((m) => m.HomeModule),
  },
  // {
  //   path: 'browse',
  //   loadChildren: () => import('~/app/browse/browse.module').then((m) => m.BrowseModule),
  // },
  // {
  //   path: 'search',
  //   loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
  // },
  {
    path: "featured",
    loadChildren: () =>
      import("~/app/featured/featured.module").then((m) => m.FeaturedModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("~/app/settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "tabbar",
    component: TabBarComponent,
    children: [
      {
        path: "browse",
        loadChildren: () =>
          import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browse",
      },
      {
        path: "search",
        loadChildren: () =>
          import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "search",
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
