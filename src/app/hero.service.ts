import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tao} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //把messageService注入heroService
  constructor(private http: HttpClient, private messageService: MessageService) { }
  private heroesUrl = 'api/heroes';  // URL to web api
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  getHeroes(): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError('getHeroes', [])));
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
