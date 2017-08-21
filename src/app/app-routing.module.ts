import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './Dashboard/dashboard.component';
import { HeroesComponent }      from './ListClubs/heroes.component';
import { HeroDetailComponent }  from './ClubDetail/hero-detail.component';
import { PlayersComponent }     from './ListPlayers/players.component';
import { PlayerDetailComponent} from './PlayerDetail/player-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',        component: DashboardComponent },
  { path: 'detail/:id',       component: HeroDetailComponent },
  { path: 'heroes',           component: HeroesComponent },
  { path: 'players',          component: PlayersComponent},
  { path: 'detailPlayer/:id', component: PlayerDetailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
