import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  constructor(public sceneService: SceneService) {}

  ngOnInit(): void {}
}
