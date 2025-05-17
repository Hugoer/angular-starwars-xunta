import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScaleOnHover]',
  standalone: true
})
export class ScaleOnHoverDirective {
  @HostBinding('style.transform') transform: string = 'scale(1)';
  @HostBinding('style.transition') transition: string = 'transform 0.2s ease';

  @HostListener('mouseenter') onEnter() {
    this.transform = 'scale(1.05)';
  }

  @HostListener('mouseleave') onLeave() {
    this.transform = 'scale(1)';
  }
}
