import { Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { CharacterFilterListComponent } from './pages/character-filterlist/character-filterlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: 'character', component: CharacterListComponent },
  { path: 'character/filter', component: CharacterFilterListComponent },
  { path: 'character/:id', component: CharacterDetailComponent },
  { path: '**', redirectTo: 'character' },
];
