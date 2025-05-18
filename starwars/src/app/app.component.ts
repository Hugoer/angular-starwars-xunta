import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Definir idiomas soportados
    this.translate.addLangs(['gl', 'en']);
    // Establecer idioma por defecto (fallback)
    this.translate.setDefaultLang('gl');
    // Detectar idioma del navegador
    const browserLang = this.translate.getBrowserLang();
    // Usar el idioma del navegador si es 'gl' o 'en'; de lo contrario usar 'gl'
    const selectedLang = (browserLang === 'gl' || browserLang === 'en') ? browserLang : 'gl';
    this.translate.use(selectedLang);
  }
}
