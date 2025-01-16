// import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { finalize } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class UploadService {

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
// }
