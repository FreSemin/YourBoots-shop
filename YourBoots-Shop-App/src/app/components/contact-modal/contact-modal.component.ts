import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
	selector: 'app-contact-modal',
	templateUrl: './contact-modal.component.html',
	styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
	public contactForm: FormGroup = this.modalService.contactModalForm;

	constructor(
		public modalService: ModalService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
