import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input() public placeholder: string = '';

  @Output() public onValue = new EventEmitter<string>();

  emitTerm(term: string): void {
    if (term.trim() === '') return;
    this.onValue.emit(term);
  }
}
