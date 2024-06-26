import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TutorialDialogComponent } from "../tutorial-dialog/tutorial-dialog.component";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MainService } from '../main/main.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sideNavClick = new EventEmitter();

  constructor(
    private mainService: MainService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      `menu`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/menu.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `questionMark`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/question-mark.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `settings`,
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("./assets/images/settings.svg")
    );
  }

  ngOnInit(): void {}

  public newGame(event: any) {
    this.mainService.newGame();
    event.originalTarget.parentNode.parentNode.blur();
  }

  public openTutorialDialog() {
    this.dialog.open(TutorialDialogComponent, {
      position: {
        top: "50px"
      },
      maxHeight: "calc(100vh - 75px)"
    });
  }

  public openStatsDialog() {
    this.mainService.openStatisticsDialog();
  }

  public openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent, {
      position: {
        top: "50px"
      },
      maxHeight: "calc(100vh - 75px)"
    })
  }

  public openSideNav() {
    this.sideNavClick.emit();
  }
}
