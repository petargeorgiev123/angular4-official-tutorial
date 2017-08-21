import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
    selector: 'my-players',
    templateUrl: './players.component.html',
    styleUrls: [ './players.component.css' ]
})

export class PlayersComponent implements OnInit {
    players: Player[];
    selectedPlayer: Player;

    clubs: Hero[];

    /*states = [
        {name: 'Arizona', abbrev: 'AZ'},
        {name: 'California', abbrev: 'CA'},
        {name: 'Colorado', abbrev: 'CO'},
        {name: 'New York', abbrev: 'NY'},
        {name: 'Pennsylvania', abbrev: 'PA'},
    ];*/

    constructor(private router: Router,
                private playerService: PlayerService,
                private heroService: HeroService) {
    }

    getPlayersO(): void {
        this.playerService.getPlayersObserver().subscribe(data => {
            this.players = data;
        });
    }

    getClubs(): void {
        this.heroService.getHeroesObserver().subscribe(data => {
            this.clubs = data;
        });
    }

    onSelect(player: Player): void {
        this.selectedPlayer = player;
    }

    add(name: string, club_id: string): void {
        name = name.trim();
        club_id = club_id.trim();
        if (!name) { return; }
        if (!club_id) { return; }
        this.playerService.create(name, club_id)
            .then(player => {
                this.players.push(player);
                this.selectedPlayer = null;
            });
    }

    delete(player: Player): void {
        this.playerService
            .delete(player.id)
            .then(() => {
                this.players = this.players.filter(h => h !== player);
                if (this.selectedPlayer === player)
                {
                    this.selectedPlayer = null;
                }
            });
    }

    gotoDetail(): void {
        this.router.navigate(['/detailPlayer', this.selectedPlayer.id]);
    }

    ngOnInit(): void {
        this.getPlayersO();
        this.getClubs();
    }
}