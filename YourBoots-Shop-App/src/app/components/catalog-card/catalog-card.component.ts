import { Component, Input, OnInit } from '@angular/core';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent implements OnInit {

  @Input()
  public catalogElement: ICatalogElement;

  // tslint:disable-next-line: no-empty
  constructor() { }

  // tslint:disable-next-line: no-empty
  public ngOnInit(): void {
  }

}
