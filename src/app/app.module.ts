import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, ToolsComponent, PropertiesComponent, CanvasComponent, ModalComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
