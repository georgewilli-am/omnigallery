import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeIndexComponent } from './theme-index.component';
import ThemeIndexRouting from './theme-index.routing';
import { ThemeCardComponent } from 'src/app/components/theme-card/theme-card.component';

@NgModule({
  declarations: [ThemeIndexComponent, ThemeCardComponent],
  imports: [CommonModule, ThemeIndexRouting]
})
export class ThemeIndexModule {}
