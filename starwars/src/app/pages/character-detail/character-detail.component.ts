import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';
import { StarwarsService } from '../../core/services/starwars.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {

  constructor(private logger: LoggerService) {
    this.logger.log('CharacterDetailComponent initialized');
  }
  private route = inject(ActivatedRoute);
  private starWarsService = inject(StarwarsService);

  character$ = this.starWarsService.getCharacterById(Number(this.route.snapshot.paramMap.get('id')));
}
