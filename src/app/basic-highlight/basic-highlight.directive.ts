import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    // this would select by element, but we want it to select by attribute
    // so we wrap it in [].  This makes it recognized whenever we add
    // 'appBasicHighlight' without [] to an element.
    selector: '[appBasicHighlight]'
})
export class BasicHightlightDirective implements OnInit {
    // to make sure it works, we can just change say background color when we
    // attach this directive to an element.  To do so  we need to get access
    // to the element the directive sits on and angular allows us to inject
    // the element the attribute sits on into this directive.  The type is
    // important and has to be ElementRef.  
    // I then just turn it into a property using TypeScript shortcut by adding
    // private in front of it so we can use this property everywhere inside
    // this class.
    constructor(private elementRef: ElementRef) {}
    
    ngOnInit() {
        // just set background color to see if it works
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

    // finally, to use this directive we have to do 2 things:
    // - inform Angular that we have new directive in app.module declarations section
    // - and use it on some element

    // NOTE! While this method works, it is not the best as you might recall
    // accessing HTML DOM elements from within ts file is not recommended
    // because Angualar my render your template without DOM in which case
    // these properties will not be available.  This is an advanced topic.
    // So, we will create another directive using proper ways.  For that, I 
    // created better-highlight directive using ng g d command.
}