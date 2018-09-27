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
				label: 'Khách hàng', icon: 'fa fa-users', routerLink: ['/customers'], routerLinkActiveOptions: { exact: true }
			},
			{
				label: 'Hóa đơn', icon: 'fa fa-bookmark', routerLink: ['/bill'], routerLinkActiveOptions: { exact: true }
			},
			{
				label: 'Cài đặt', icon: 'fa fa-cog', routerLink: ['/setting'], routerLinkActiveOptions: { exact: true }
			}
		];
	}

}
