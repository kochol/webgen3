import { Component, OnInit, Input } from '@angular/core';

export class TabButton {
  label?: string;
  icon?: string;
  url?: string;
  isSaved?: boolean;
  isVisible?: boolean;
  isActive?: boolean;
  command?: (event?: any) => void;
  closeCommand?: (event?: any) => void;
}

@Component({
  selector: 'app-tabMenu',
  templateUrl: './tabMenu.component.html',
  styleUrls: ['./tabMenu.component.scss']
})
export class TabMenuComponent implements OnInit {

  @Input() items: TabButton[] = [];
  constructor() { }

  ngOnInit() {
  }

  itemClick(event, item: TabButton) {
    if (!item.url) {
      event.preventDefault();
    }

    item.isActive = true;

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
  }

  closeClicked(event, item: TabButton) {
    event.preventDefault();
    if (item.closeCommand) {
      item.closeCommand({
        originalEvent: event,
        item: item
      });
    }
  }
}
