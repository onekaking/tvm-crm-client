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
				label: 'Khách hàng', icon: 'pi pi-fw pi-check', routerLink: ['/customers']
			},
			{
				label: 'Khóa học', icon: 'pi pi-fw pi-check', routerLink: ['/courses']
			},
			{
				label: 'Hóa đơn', icon: 'pi pi-fw pi-check', routerLink: ['/bill']
			}
		];
	}

}
