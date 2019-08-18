import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadService } from './upload.service';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  constructor(private uploadService: UploadService) {}
  public imagePreviews = [];
  private images: NgxFileDropEntry[] = [];

  ngOnInit() {}

  public uploadImages(files: NgxFileDropEntry[]) {
    this.images = files.slice(0, 3);

    for (const image of this.images) {
      const imageEntry = image.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

      imageEntry.file(file => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagePreviews[this.imagePreviews.length] = reader.result;
          this.imagePreviews = this.imagePreviews.splice(0, 3);
        };
      });
    }
  }

  public deleteImage(index) {
    console.log(index);
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
