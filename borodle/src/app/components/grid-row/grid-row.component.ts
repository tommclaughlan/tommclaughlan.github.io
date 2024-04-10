import { Component, OnInit , Input} from '@angular/core';
import { MainService } from '../main/main.service';

@Component({
  selector: 'grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss']
})
export class GridRowComponent implements OnInit {
  @Input() rowNum!: number;

  public chars: number[] = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.currentWord$.subscribe(word => {
      this.chars = Array(word.length).fill(0);
    });
  }
}
