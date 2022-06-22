import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  
  @Input() data: string[] = [];
  selected: string = 'Sort';

  constructor() {}

  ngOnInit(): void {
  }

  @Output() sortValueEmitter = new EventEmitter<string>();
  
  sortValue(): void{
    this.sortValueEmitter.emit(this.selected)
  }
  
  compareFn(value1: string, value2: string): boolean{
    return value1 === value2? true : false
  }
}
