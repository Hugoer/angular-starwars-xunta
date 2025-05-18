import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-menu.component.html',
  styleUrls: ['./character-menu.component.scss']
})
export class CharacterMenuComponent {}
