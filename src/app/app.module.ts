import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component';
import { ColorPickerModalComponent } from './components/color-picker-modal/color-picker-modal.component';
import { OptionsModalComponent } from './components/options-modal/options-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    PropertiesComponent,
    CanvasComponent,
    ModalLayoutComponent,
    ColorPickerModalComponent,
    OptionsModalComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
