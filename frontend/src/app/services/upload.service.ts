import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

    private apibaseurl = environment.baseurl;

    constructor(private http: HttpClient) {}

    uploadFilesToGCP(files: File[]): Observable<any> {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      return this.http.post(`${this.apibaseurl}/upload-to-gcp`, formData);
    }
  
    processFiles(fileNames: string[]): Observable<any> {
      return this.http.post(`${this.apibaseurl}/process-files`, { fileNames });
    }



















//   constructor(private storage: AngularFireStorage) { }

//   upload(files: File[]): Observable<any>{
//     // const fileRef = this.storage.ref(path);
//     // const task = fileRef.put(file);
//   if(files.length > 0 && files.length <=5){
//   files.forEach(file => {
//     const filePath = 'uploads/${Date.now()}_${file.name}';
//     const fileRef = this.storage.ref(filePath);
//     const task = fileRef.put(file);
//     return task.snapshotChanges().pipe(
//       finalize(() => {
//         fileRef.getDownloadURL().subscribe((url) => {
//           console.log('File available at', url);
//         });
//       })
//     );
//   })
// }
    
//   }
}
