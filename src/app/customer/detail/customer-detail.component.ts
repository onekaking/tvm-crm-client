import { Component } from '@angular/core';
import { Customer } from '../customer.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';
import { Note } from '../note.model';

@Component({
	selector: 'app-customer-detail',
	templateUrl: './customer-detail.component.html',
	styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
	customer: Customer = new Customer();
	customerLoad$: Observable<Object>;
	newNote: string = '';
	isPostingNote: boolean = false;

	constructor(private route: ActivatedRoute,
		private router: Router, private customerService: CustomerService) {}

	ngOnInit() {
		this.customerLoad$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => this.customerService.getCustomer(params.get('id')))
		);

		this.customerLoad$.subscribe((data: Customer) => {
			console.log(data);
			// var trueDate = new Date(data.birth)
			this.customer = data;
		});
	}

	createNewNoteForCustomer() {
		this.isPostingNote = true;
		var note = new Note();
		note.content = this.newNote;
		note.owner = this.customer.id;
		this.customerService.postNote(note).subscribe((data: any) => {
			this.newNote = '';
			this.customer.notes.push(data);
			this.isPostingNote = false;
		});
	}
}
