import { Component, effect, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { StarwarsService } from '../../core/services/starwars.service';
import { LoggerService } from '../../core/services/logger.service';
import { Character } from '../../core/models/swapi.model';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-character-filterlist',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    FormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './character-filterlist.component.html',
  styleUrls: ['./character-filterlist.component.scss']
})
export class CharacterFilterListComponent {
  // Signals
  searchTerm = signal('');
  isLoading = signal(false);
  error = signal<string | null>(null);
  characters = signal<Character[]>([]);

  // Services
  private logger = inject(LoggerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private swService = inject(StarwarsService);

  constructor() {
    this.logger.log('CharacterFilterListComponent initialized');

    // Inicializar searchTerm solo si hay valor en la URL (pero sin lanzar efecto todavía)
    const initialName = this.route.snapshot.queryParamMap.get('name') ?? '';
    this.searchTerm.set(initialName);

    this.setupEffect();
  }

  private setupEffect() {
    let debounceTimer: ReturnType<typeof setTimeout>;

    effect(() => {
      const term = this.searchTerm().trim();

      // Evitar actualizar si es el mismo valor que ya está en la URL
      const currentParam = this.route.snapshot.queryParamMap.get('name') ?? '';
      if (term !== currentParam) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { name: term || null },
          queryParamsHandling: 'merge'
        });
      }

      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        this.isLoading.set(true);
        this.error.set(null);

        const request$ = term
          ? this.swService.getCharactersByName(term)
          : this.swService.getCharacters();

        request$.subscribe({
          next: chars => {
            this.characters.set(chars);
            this.isLoading.set(false);
          },
          error: () => {
            this.error.set('Error al cargar personajes.');
            this.isLoading.set(false);
          }
        });
      }, 300);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  resetSearch() {
    this.searchTerm.set('');
  }
}
