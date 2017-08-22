import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Player } from './player';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
    private playersUrl = 'http://api.lala.dev/app_dev.php/jugador';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getPlayersObserver(): Observable<Player[]> {
        return this.http
            .get(`http://api.lala.dev/app_dev.php/jugadores/list`)
            .map(response => response.json());
    }

    getPlayer(id: number): Promise<Player> {
        const url = `${this.playersUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPlayerObserver(id: number): Observable<Player> {
        return this.http
            .get(`http://api.lala.dev/app_dev.php/jugador/${id}`)
            .map(response => response.json());
    }

    create(name: string, club_id: string): Promise<Player> {
        return this.http
            .post('http://api.lala.dev/app_dev.php/jugador', JSON.stringify({name: name, club: club_id}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.playersUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    update(player: Player, clubId: number): Promise<Player> {
        const url = `${this.playersUrl}/${player.id}`;
        return this.http
            .put(url, JSON.stringify({name: player.name, club: clubId}), {headers: this.headers})
            .toPromise()
            .then(() => player)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
