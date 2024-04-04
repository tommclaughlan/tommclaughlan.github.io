import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public rows: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
