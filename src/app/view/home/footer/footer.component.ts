import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private actualDate = new Date();
  public copyText: string = '© CJT-' + this.actualDate.getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
