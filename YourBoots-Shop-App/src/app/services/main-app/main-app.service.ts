import { OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainAppService implements OnInit, OnDestroy  {

  constructor() { }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
