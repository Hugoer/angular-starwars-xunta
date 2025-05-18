import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface OptionItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-new-person-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './new-person-form.component.html',
  styleUrls: ['./new-person-form.component.scss']
})
export class NewPersonFormComponent implements OnInit {

  personForm = new FormGroup({
    name: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    mass: new FormControl('', Validators.required),
    hair_color: new FormControl('', Validators.required),
    skin_color: new FormControl('', Validators.required),
    eye_color: new FormControl('', Validators.required),
    birth_year: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    homeworld: new FormControl('', Validators.required),
    films: new FormControl<string[]>([], Validators.required),
    species: new FormControl<string[]>([], Validators.required),
    vehicles: new FormControl<string[]>([], Validators.required),
    starships: new FormControl<string[]>([], Validators.required)
  });

  // Signals de estado
  isLoading = signal(false);
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  // Validación reactiva del formulario
  formValid = signal(this.personForm.valid);

  // Opciones para los dropdowns
  filmsOptions = signal<OptionItem[]>([]);
  speciesOptions = signal<OptionItem[]>([]);
  vehiclesOptions = signal<OptionItem[]>([]);
  starshipsOptions = signal<OptionItem[]>([]);

  // Botón habilitado solo si formulario válido y no hay loading o envío
  canSubmit = computed(() =>
    !this.isLoading() && !this.isSubmitting()
  );

  constructor(private http: HttpClient) {
    effect(() => {
      this.personForm.statusChanges.subscribe(() => {
        this.formValid.set(this.personForm.valid);
      });
    });
  }

  ngOnInit(): void {
    this.isLoading.set(true);

    forkJoin({
      films: this.http.get<any>('https://www.swapi.tech/api/films'),
      species: this.http.get<any>('https://www.swapi.tech/api/species'),
      vehicles: this.http.get<any>('https://www.swapi.tech/api/vehicles'),
      starships: this.http.get<any>('https://www.swapi.tech/api/starships')
    }).subscribe({
      next: response => {
        this.filmsOptions.set(
          response.films?.result
            ?.map((film: any) => ({
              label: `${film.properties.title} (Ep. ${film.properties.episode_id})`,
              value: film.url
            })) || []
        );

        this.speciesOptions.set(
          response.species?.results?.map((sp: any) => ({
            label: sp.name,
            value: sp.url
          })) || []
        );

        this.vehiclesOptions.set(
          response.vehicles?.results?.map((veh: any) => ({
            label: veh.name,
            value: veh.url
          })) || []
        );

        this.starshipsOptions.set(
          response.starships?.results?.map((sh: any) => ({
            label: sh.name,
            value: sh.url
          })) || []
        );

        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar las listas de opciones.');
        this.isLoading.set(false);
      }
    });

    // Mantener actualizado formValid de forma reactiva
    effect(() => {
      this.personForm.statusChanges.subscribe(() => {
        this.formValid.set(this.personForm.valid);
      });
    });
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    const payload = this.personForm.value;

    this.http.post('https://www.swapi.tech/api/people', payload).subscribe({
      next: res => {
        console.log('Personaje creado:', res);
        this.personForm.reset();
        this.isSubmitting.set(false);
      },
      error: () => {
        this.error.set('Error al crear el personaje.');
        this.isSubmitting.set(false);
      }
    });
  }
}
