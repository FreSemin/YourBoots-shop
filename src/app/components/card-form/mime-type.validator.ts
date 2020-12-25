import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

// tslint:disable-next-line: typedef
export const mimeType = (
	control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
	const file: File = control.value as File;
	const reader: FileReader = new FileReader();
	// tslint:disable-next-line: deprecation
	const readerObs: any = Observable.create((observer: Observer<{ [key: string]: any }>) => {
		reader.addEventListener('loadend', () => {
			// tslint:disable-next-line: no-magic-numbers
			const arr: Uint8Array = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
			let header: string = '';
			let isValid: boolean = false;

			// tslint:disable-next-line: prefer-for-of
			for (let i: number = 0; i < arr.length; i++) {
				header += arr[i].toString(16);
			}

			switch (header) {
				case '89504e47':
					isValid = true;
					break;
				case 'ffd8ffe0':
				case 'ffd8ffe1':
				case 'ffd8ffe2':
				case 'ffd8ffe3':
				case 'ffd8ffe8':
					isValid = true;
					break;
				default:
					isValid = false;
					break;
			}

			if (isValid) {
				observer.next(null);
			} else {
				observer.next({ invalidMimeType: true });
			}

			observer.complete();
		});
		reader.readAsArrayBuffer(file);
	});

	return readerObs;
};
