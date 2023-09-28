import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { from, finalize, mergeMap } from 'rxjs';

import { FileUpload } from './file.upload';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  currentFileUpload?: FileUpload;
  downloadUrls: string[] = [];
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(files: File[]) {
    
    this.downloadUrls = [];

    const uploads = files.map(f => {

      return this.currentFileUpload = new FileUpload(f)
    });

    return from(uploads).pipe(
    mergeMap(f => {
      const fileName = this.uniquePath(f.file.name);
      const filePath = `${this.basePath}/${fileName}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, f.file);
      
      return uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            f.url = downloadURL;
            f.name = fileName;
            this.saveFileData(f);
          });
        })
      );

    }));

  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
    this.downloadUrls.push(fileUpload.url);
  }

  get uploadUrls() {
    return this.downloadUrls;
  }


  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  private uniquePath(name: string): string {

    return name
      .replace(name.substring(name.lastIndexOf(".")),
        (new Date().toISOString()
          + Math.random().toString().slice(2))
        + name.substring(name.lastIndexOf(".")))
      .replaceAll(":", "-");

  }
}