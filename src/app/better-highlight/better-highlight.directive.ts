import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  // here is better way to inject
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  // now that we have these properties, we can bind to them from outside and therefore
  // not have our colors hardcoded.
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';  // here we set it as alias so we can use it as ngStyle

  
  // @HostBinding needs to be bound to a property we are interested in so it receives that property 
  // like here style.backgroundColor in camel case.  So, we create a new property backgroundColor
  // of type string here and pass it prperty of host element to which we want to bind which is
  // style.backgroundColor.  we also set initial value to 'transparent' or later we assigned a
  // property to it.
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit(): void {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor=this.defaultColor;
  }

  // style it blue background only if I mouse hover over it.  we add it to a method we want to
  // execute like below mouseOver method.  it takes string representing event we are listening to.
  // So, what is passed into @HostListener is string representing real even name of an element. So,
  // @HostListener is just a convenient way to listen to events of an element to which you apply
  // your custom directive.
  // This gives an reactive custom directive.
  @HostListener('mouseenter') mouseOver(eventData: Event) {
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;  // now instead of renderer, we use @HostBinding property
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;  // now instead of renderer, we use @HostBinding property
  }

}
