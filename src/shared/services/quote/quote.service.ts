import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class QuoteService {
    constructor(private http: HttpService) {}

    getQuotes(){
        return this.http.get('https://api.chucknorris.io/jokes/random?category=dev')
        .pipe(
            map(response => response.data)
        );
    }
}
