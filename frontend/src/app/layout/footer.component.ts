import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<mat-toolbar color="primary" role="contentinfo"><span class="mx-auto">© 2025 Inipod</span></mat-toolbar>`,
  styles: [':host { display:block; } mat-toolbar { margin-top:16px; }']
})
export class FooterComponent {}
