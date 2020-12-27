import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  tools: Array<string> = ['Circle', 'Rectangle'];

  constructor() { }

  ngOnInit(): void {
  }

}
