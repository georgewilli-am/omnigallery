import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadService } from './upload.service';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  public uploadForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  private themeFile;

  constructor(private uploadService: UploadService) {}

  ngOnInit() {}

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.themeFile = {
            filename: droppedFile.relativePath,
            size: file.size
          };
        });
      }
    }
  }

  onSubmit() {
    const formData = this.uploadForm.value;
    this.uploadService.uploadTheme({...formData, theme: this.themeFile}).subscribe();
  }

}
