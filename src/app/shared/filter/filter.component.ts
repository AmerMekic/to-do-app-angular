import { Component, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  faDownArrow = faAngleDown;
  menuOpen: boolean = false;
  filterValues: string[] = [];
  constructor(private router: Router) { }
  @ViewChild('filterMenu')menu!: ElementRef<any>;
  
  ngOnInit(): void {
  }

  openFilterMenu(menu: HTMLDivElement): void{
    if(menu.style.display == 'none' || menu.style.display == ''){
      menu.style.display = 'flex';
    }
    else{
      menu.style.display = 'none';
    }
  }

  toogleFilters(value: HTMLElement): void{
    let filterValue = value.getAttribute('value')
    if(value.style.backgroundColor === 'rgb(0, 163, 68)'){
      value.style.backgroundColor = 'black'
      this.filterValues = this.filterValues.filter(data => data !== filterValue )
    }
    else{
      value.style.backgroundColor = '#00A344'
      if(filterValue !== null){
        this.filterValues.push(filterValue)
      }   
    }    
  }

  clearFilters():void{
    this.filterValues =  [];
    var menuChildren = this.menu.nativeElement.childNodes
    menuChildren.forEach((child: HTMLElement) => {
      if(child.classList.contains('filter-menu__options')){
        child.style.backgroundColor = 'black';
      }
    });
    this.filterEmitter.emit(this.filterValues)
  }

  @Output() filterEmitter = new EventEmitter<string[]>();

  filterValuesEmitter():void{
    this.filterEmitter.emit(this.filterValues);
  }

}
