import { Component, Input, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input()
  public orderElement: ICatalogElement;

  constructor(public catalogService: CatalogService) { }

  // tslint:disable-next-line: no-empty
  public ngOnInit(): void { }

}
