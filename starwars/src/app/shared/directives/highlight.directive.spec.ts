import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let element: HTMLElement;
  let renderer: jasmine.SpyObj<Renderer2>;
  let directive: HighlightDirective;

  beforeEach(() => {
    element = document.createElement('div');
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);
    const elementRef = new ElementRef(element);
    directive = new HighlightDirective(elementRef, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should highlight element on mouse enter', () => {
    directive.onMouseEnter();
    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'background-color', '#f5f5f5');
  });

  it('should remove highlight on mouse leave', () => {
    // Simulate hover first, then leave
    directive.onMouseEnter();
    directive.onMouseLeave();
    expect(renderer.removeStyle).toHaveBeenCalledWith(element, 'background-color');
  });
});
