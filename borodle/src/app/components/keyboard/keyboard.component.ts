import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {KEY_ROW_1, KEY_ROW_2, KEY_ROW_3} from "../../keyList";

@Component({
  selector: 'keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  keyRow1: string[] = KEY_ROW_1;
  keyRow2: string[] = KEY_ROW_2;
  keyRow3: string[] = KEY_ROW_3;
  @Output() onKeyClick = new EventEmitter<string>();
  @Output() onBackspace = new EventEmitter<string>();
  @Output() onEnter = new EventEmitter<string>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `backspace`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/backspace.svg")
    ); }

  ngOnInit(): void {
  }

  backspaceClick() {
    this.onBackspace.emit();
  }

  enterClick() {
    this.onEnter.emit();
  }

  keyClick(key: string) {
    this.onKeyClick.emit(key);
  }

}
