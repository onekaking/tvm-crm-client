import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/components/common/api';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingComponent {
    items: MenuItem[];

	ngOnInit() {
		this.items = [
			{
				label: 'Khóa học', icon: 'fa fa-users', routerLink: ['course'], routerLinkActiveOptions: { exact: true }
			}
		];
	}

}
