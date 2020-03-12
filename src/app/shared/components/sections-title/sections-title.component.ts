import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sections-title',
  templateUrl: './sections-title.component.html',
  styleUrls: ['./sections-title.component.css']
})
export class SectionsTitleComponent implements OnInit {
  @Input() content;

  constructor() { }

  ngOnInit(): void {
  }

}
