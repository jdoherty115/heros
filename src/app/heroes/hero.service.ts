import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root',
})

export class HeroService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

  //getHeroes(): Observable<Hero[]> {
   // this.messageService.add('HeroService: fetched heroes');
  // return of(HEROES);
  //}
  getHeroes (): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
   return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesUrl = 'api/heroes';
  
  }
