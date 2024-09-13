import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerTime: number = 500;
  private debouncerSubscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';

  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(this.debouncerTime))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitTerm(term: string): void {
    if (term.trim() === '') return;
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
