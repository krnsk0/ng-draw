import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
  declarations: [AppComponent, ToolsComponent, PropertiesComponent, CanvasComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
