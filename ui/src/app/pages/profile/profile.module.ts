import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import ProfileRouting from "./profile.routing";
import { UploadComponent } from "./upload/upload.component";
import { UploadService } from "./upload/upload.service";
import { NgxFileDropModule } from "ngx-file-drop";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ProfileComponent, UploadComponent],
  imports: [
    ProfileRouting,
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UploadService]
})
export class ProfileModule {}
