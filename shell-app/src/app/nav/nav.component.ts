import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  @Input() cartCount: number = 0;
}
