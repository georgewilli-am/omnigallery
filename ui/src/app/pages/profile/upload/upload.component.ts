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

  ngOnInit() {}

}
