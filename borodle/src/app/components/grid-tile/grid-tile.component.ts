import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainService } from '../main/main.service';

@Component({
  selector: 'grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {
  @Input() tileNum!: number;
  @Input() rowNum!: number;

  tileLetter!: string;
  rowWord!: string;
  letterStatus!: string;

  guessedWordsList$ = this.mainService.guessedWordsList$;
  guessedWord$ = this.mainService.guessedWord$;
  currentRow$ = this.mainService.currentRow$;
  currentWord$ = this.mainService.currentWord$

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    // get the tile letter for the correct tile in the correct row
    this.guessedWordsList$.pipe(
      map((words) => {
        return words.filter((word, idx) => {
          return idx === this.rowNum;
        })
      }),
      map(value => value[0]),
      map(word => {
        return word ? word : "";
      })
    ).subscribe(guessedWord => {
      this.rowWord = guessedWord;
      this.tileLetter = guessedWord[this.tileNum];
    })

    // compare letter to the current, real, word's letter in this index
    this.currentWord$.subscribe(currentWord => {
      if(this.tileLetter === currentWord[this.tileNum])
        this.letterStatus = "correct";
      else if(currentWord.includes(this.tileLetter)) {
        let occurrences = 0;
        let guessedWordIdxs = [];
        for (let i=0; i<this.rowWord.length; i++) {
          if (currentWord[i] === this.tileLetter) {
              occurrences++;
          }
          else if (this.rowWord[i] === this.tileLetter) {
            guessedWordIdxs.push(i);
          }
        }

        if (guessedWordIdxs.indexOf(this.tileNum) < occurrences) {
            this.letterStatus = "close";
        } else {
          this.letterStatus = "incorrect";
        }
      }
      else if(!currentWord.includes(this.tileLetter) && !!this.tileLetter)
        this.letterStatus = "incorrect";
      else this.letterStatus = "";
    })

    // update the tile letter when we enter a new letter for our currently guessed word
    combineLatest([this.currentRow$, this.guessedWord$]).pipe(map(([currentRow, guessedWord]) => {
      if(currentRow === this.rowNum) {
        this.tileLetter = guessedWord[this.tileNum]
      }
    })).subscribe()
  }
}
