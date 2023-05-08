import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';

@Component({
  selector: 'ns-tabs',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
  moduleId: module.id,
})
export class TabBarComponent implements OnInit {

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ) { }

  ngOnInit() {
    this.router.navigate(
      [
        {
      outlets: {
        browse: ["browse"],
        search: ["search"]
      }
        }
      ],
      {
        relativeTo: this.active
      }
    );
    this.page.actionBarHidden = true;
  }

}
