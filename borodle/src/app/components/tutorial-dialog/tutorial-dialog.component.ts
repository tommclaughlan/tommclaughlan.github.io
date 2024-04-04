import { Component, OnInit } from '@angular/core';

export interface IWordExample {
  word: string;
  index: number;
  status: string;
}

@Component({
  selector: 'app-tutorial-dialog',
  templateUrl: './tutorial-dialog.component.html',
  styleUrls: ['./tutorial-dialog.component.scss']
})
export class TutorialDialogComponent implements OnInit {
  public wordExamples: IWordExample[] = [
    {
      word: "barmby",
      index: 0,
      status: "correct"
    },
    {
      word: "traore",
      index: 1,
      status: "close"
    },
    {
      word: "doriva",
      index: 3,
      status: "incorrect"
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
