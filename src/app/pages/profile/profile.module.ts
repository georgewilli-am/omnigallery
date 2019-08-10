import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import ProfileRouting from './profile.routing';

@NgModule({
  declarations: [ProfileComponent],
  imports: [ProfileRouting, CommonModule]
})
export class ProfileModule {}
