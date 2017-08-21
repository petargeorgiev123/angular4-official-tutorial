import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './Dashboard/dashboard.component';
import { HeroDetailComponent }  from './ClubDetail/hero-detail.component';
import { HeroesComponent }      from './ListClubs/heroes.component';
import { HeroService }          from './hero.service';
import { PlayersComponent }     from './ListPlayers/players.component';
import { PlayerService }        from './player.service';
import { HeroSearchComponent }  from './Search/hero-search.component';

import { AppRoutingModule }     from './app-routing.module';
import {PlayerDetailComponent} from "./PlayerDetail/player-detail.component";

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    PlayersComponent,
    PlayerDetailComponent,
    HeroSearchComponent
  ],
  providers: [ HeroService, PlayerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
