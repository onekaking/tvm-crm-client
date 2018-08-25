import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Khách hàng', icon: 'fa fa-fw fa-check', routerLink: ['/customers']
      },
      {
        label: 'Học viên', icon: 'fa fa-fw fa-check', routerLink: ['/students']
      }
    ];
  }

}
