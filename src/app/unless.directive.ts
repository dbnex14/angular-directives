import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // i need to get condition as an input.  Note that we turn it into setter method
  // here so we can execute the condition.  So, this setter method will get executed
  // whenever the property changes.  Keep in mind that this is custom structural
  // directive so it will be executed on ng-template element because that is what it
  // gets transfered to by Angular if we dont use * in structural directives.  So, we
  // can get access to this template and we also need to get access to the place in
  // the document whwere we want to render it.  Both can be injected in c-tor.
  // Note that the property name must be same as directive selector name.
  @Input()  set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  // So, here we inject reference to our template which is generic so we simply use
  // any type.  and we pass the location where in document we want to render it using
  // ViewContainerRef.  So, basically we are passing here WHAT, WHERE.
  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { 

  }

}
