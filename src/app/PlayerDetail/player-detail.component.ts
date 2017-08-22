import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'player-detail',
    templateUrl: './player-detail.component.html',
    styleUrls: [ './player-detail.component.css' ]
})

export class PlayerDetailComponent implements OnInit {
    //@Input() player: Player;
    player: Player;

    objClub:  Hero[];
    selectedObject: Hero;

    constructor(
        private playerService: PlayerService,
        private route: ActivatedRoute,
        private location: Location,
        private heroService: HeroService
    ) {
    }

    getClubs(): void {
        this.heroService.getHeroesObserver().subscribe(data => {
            this.objClub = data;
        });
    }

    updateSelectedValue(event: string): void {
        this.selectedObject = JSON.parse(event);
    }

    goBack(): void {
        this.location.back();
    }

    getSinglePlayer(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.playerService.getPlayer(+params.get('id'))).subscribe(data => {
                    this.player = data;
                    this.selectedObject = data.club;
                });
    }

    ngOnInit(): void {

        this.getSinglePlayer();
        this.getClubs();
    }

    save(): void {
        this.playerService.update(this.player, this.selectedObject.id)
            .then(() => this.goBack());
    }
}