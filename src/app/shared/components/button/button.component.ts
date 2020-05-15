import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() content : string;
  @Input() type : string;
  @Input() icon : string;
  @Input() action: void;
  @Input() disabled: boolean = false;
  @Output() clickCusto: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
