import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  constructor(public toolsService: ToolsService, public sceneService: SceneService) {}

  ngOnInit(): void {}
}
