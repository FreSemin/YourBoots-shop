import { Component, Input, OnInit } from '@angular/core';

enum ESizeMap {
  small = 'sml',
  medium = 'md',
  big = 'bg',
}

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {

  public ESizeMapProp: {} = ESizeMap;

  @Input()
  public loaderSize: string = '';

  // tslint:disable-next-line: no-empty
  constructor() { }

  // tslint:disable-next-line: no-empty
  public ngOnInit(): void { }

}
