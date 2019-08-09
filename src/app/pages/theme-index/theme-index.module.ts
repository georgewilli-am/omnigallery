import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeIndexComponent } from './theme-index.component';
import ThemeIndexRouting from './theme-index.routing';

@NgModule({
  declarations: [ThemeIndexComponent],
  imports: [CommonModule, ThemeIndexRouting]
})
export class ThemeIndexModule {}
