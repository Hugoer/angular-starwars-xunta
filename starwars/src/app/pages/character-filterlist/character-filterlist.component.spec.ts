import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterFilterListComponent } from './character-filterlist.component';
import { LoggerService } from '../../core/services/logger.service';
import { StarwarsService } from '../../core/services/starwars.service';
import { TranslateModule } from '@ngx-translate/core';

describe('CharacterFilterListComponent', () => {
  let fixture: ComponentFixture<CharacterFilterListComponent>;
  let component: CharacterFilterListComponent;
  let loggerSpy: jasmine.SpyObj<LoggerService>;
  let starwarsSpy: jasmine.SpyObj<StarwarsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    starwarsSpy = jasmine.createSpyObj('StarwarsService', ['getCharacters', 'getCharactersByName']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: {
        queryParamMap: {
          get: (key: string) => (key === 'name' ? '' : null)
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [CharacterFilterListComponent, TranslateModule.forRoot()],
      providers: [
        { provide: LoggerService, useValue: loggerSpy },
        { provide: StarwarsService, useValue: starwarsSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

});
