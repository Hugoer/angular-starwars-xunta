import { ScaleOnHoverDirective } from './scale-on-hover.directive';

describe('ScaleOnHoverDirective', () => {
  let directive: ScaleOnHoverDirective;

  beforeEach(() => {
    directive = new ScaleOnHoverDirective();
  });

  it('should create an instance with default scale', () => {
    expect(directive).toBeTruthy();
    // Initial style bindings
    expect(directive.transform).toBe('scale(1)');
    expect(directive.transition).toBe('transform 0.2s ease');
  });

  it('should scale up on mouseenter', () => {
    directive.onEnter();
    expect(directive.transform).toBe('scale(1.05)');
  });

  it('should scale back to normal on mouseleave', () => {
    directive.onEnter();
    directive.onLeave();
    expect(directive.transform).toBe('scale(1)');
  });
});
