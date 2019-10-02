import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Letter {
    name: string;
    email: string;
    subject: string;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactsService {

    public get email(): string {
        return 'hundred.dots@gmail.com';
    }

    public get instagram(): string {
        return 'https://www.instagram.com/daria_Khil';
    }

    public get skype(): string {
        return 'https://join.skype.com/invite/njfXwpbvjhwi';
    }

    public get behance(): string {
        return 'https://www.behance.net/daria-khil';
    }

    constructor(private http: HttpClient) { }

    public sendEmail(letter: Letter): Observable<void> {
        return this.http.post<void>('/scripts/email.php', letter);
    }
}
