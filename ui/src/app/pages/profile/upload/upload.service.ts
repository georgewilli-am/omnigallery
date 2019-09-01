import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface ThemeFile {
  filename: String;
  size: Number;
}

export interface Theme {
  title: String;
  description: String;
  theme: ThemeFile;
}
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public uploadTheme(theme: Theme) {
    return this.http.put('/api/themes', theme);
  }
}
