import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableDataSource, MatTableModule } from '@angular/material/table' ;
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChatServiceService } from '../../services/chat-service.service';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import  {RouterModule,RouterLinkActive, RouterOutlet, RouterLink, Router}  from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog.component/dialog.component';
import { RetrianDialougeComponent } from '../retrian-dialouge/retrian-dialouge.component';
import { UploadService } from '../../services/upload.service';
@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [CommonModule,MatPaginator,MatPaginatorModule,MatInputModule,MatIconModule,
    MatFormFieldModule,MatTableModule,MatToolbarModule,FormsModule,RouterOutlet, RouterLink, 
    RouterLinkActive,RouterModule,MatButtonModule,MatCardModule,MatProgressBarModule, MatTabsModule,
    MatCheckboxModule],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.scss'
})
export class UploadDocumentComponent implements OnInit{
 
  isVisible: boolean = true;
  files: File[] = [];
  uploadProgress: number[] = [];
  uploadedFiles: { isSelected: boolean, name: string; size: number; type: string,status:string }[] = [];
  uploadedLinks: { isSelected: boolean, name: string}[] = [];
  selectedFiles : File[] = [];
  uploading = false;
  progress = 0;
  isShowUploadedFiles = false;
  displayedColumns: string[] = ['select','fileName', 'fileSize','indexingStatus' ,'action'];
  displayedColumns_links: string[] = ['select','linkName','indexingStatus' ,'action'];

  dataSource = new MatTableDataSource<any>([]);
  activeTab: string = 'tab1';
  isActionOpen = false;
  activeRowIndex: number | null = null;
  selectedTabIndex = 0;

  links: string[] = [];
  newLink: string = '';

  confirmation_Ok: boolean = false; 
  uploadSuccess: boolean = false;
  showtable: boolean = true;

  @ViewChild('filter') filter!: HTMLInputElement;
  constructor(private fileUploadService: UploadService ,private router: Router,
    private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    //call the get document code from the service
    this.dataSource.data = [...this.uploadedFiles];
    this.dataSource.filterPredicate = (data: File, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase()
    this.uploadedFiles = [...this.dataSource.filteredData];
    console.log(this.uploadedFiles);
  }
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  showBrowseFiles(){
    this.isVisible = true;
    this.isShowUploadedFiles = false;
    this.uploadedFiles = [];
  }

  // Handle drag-and-drop file
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach((file) => this.addFile(file));
    }
  }

  // Prevent default behavior on dragover
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Handle file selection
  fileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFiles = Array.from(target.files);
      const files: FileList = target.files;
      const fileArray = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        isSelected: false,
      }));
      // Validate file count
      if (this.files.length + selectedFiles.length > 5) {
        alert('You can only upload up to 5 files!');
        return;
      }

      // Add valid files
      Array.from(selectedFiles).forEach((selectedFiles) => this.addFile(selectedFiles));
      this.dataSource.data = [...this.dataSource.data, ...fileArray];
      console.log("dataSource=", this.dataSource.data);     
    }
  }

  // Add file to the list
  addFile(file: File): void {
    this.files.push(file);
    this.uploadProgress.push(0); // Initialize progress to 0%
  }

   // Remove file from the list
   removeFile(index: number): void {
    this.files.splice(index, 1);
    //this.uploadProgress.splice(index, 1);
  }
 
  clearFiles(): void {
    this.files = [];
    this.uploadedFiles = [];
  }

  uploadFiles(): void {
    if (this.files.length === 0) {
      alert('No files selected!');
      return;
    }
    
    this.uploading = true;
    this.progress = 0;
    const totalFiles = this.files.length;

    
    const interval = setInterval(() => {
      this.progress += 100 / totalFiles; 

      if (this.progress >= 100) {
        clearInterval(interval); 
        this.uploading = false;
  
        this.fileUploadService.uploadFilesToGCP(this.files).subscribe((response: any) => {
          this.uploadedFiles = response.files.map((file: any) => ({
            name: file.name,
            status: 'Uploaded',
          }));
          if(this.uploadedFiles.length>0 )  {  
            this.showtable=true; 
            const dialogRef = this.dialog.open(DialogComponent, {
              data: { files: this.uploadedFiles },
            });
            this.showtable=true;
            dialogRef.afterClosed().subscribe((result) => {
              this.showtable=true;  
              if (result === 1) {
                this.openProcessingDialog();
              } else {
                this.uploadedFiles.forEach((file) => (file.status = 'Unprocessed'));
                this.showtable=false;
              }
            });
          }
          
         });
       
        this.files = [];
      }
    }, 500)
    this.isShowUploadedFiles = true;
    this.selectedTabIndex = 0;
  }

  openProcessingDialog() {
    const fileNames = this.uploadedFiles.map((file) => file.name);
    this.fileUploadService.processFiles(fileNames).subscribe((response: any) => {
      this.uploadedFiles.forEach((file) => {
        const processedFile = response.files.find((f: any) => f.name === file.name);
        file.status = processedFile ? processedFile.status : 'Unprocessed';
      });

      const dialogRef = this.dialog.open(RetrianDialougeComponent, {
      });

      dialogRef.afterClosed().subscribe(() => {
        this.showtable = true;
      });
    });
   
  }
  uploadLinks(){

    const urlList = this.newLink.split(',').map(url => url.trim());
    const validUrlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

    const validUrls = urlList.filter(url => validUrlRegex.test(url));
    const invalidUrls = urlList.filter(url => !validUrlRegex.test(url));

    if(validUrls.length > 0){
      this.links.push(...validUrls);
    }

    if(invalidUrls.length > 0){
      alert('Invalid urls')
    }
    Array.from(this.links).forEach((link) => {
      this.uploadedLinks.push({ isSelected: false, name: link});
    })
    this.newLink = '';
    this.isShowUploadedFiles = true;
    this.activeTab = 'tab2';
    this.selectedTabIndex = 1;
    console.log(this.links);
  }

  formatFileSize(size: number): string{
    return (size / (1024 * 1024)).toFixed(2) + 'MB'
  }

  onDownload(file: { name: string; content: Blob | undefined}): void {
    if(!file.content) return;

    const url = window.URL.createObjectURL(file.content);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  onDelete(file: { name: string }): void {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== file.name);
  }

  setActiveTab(tabName: string) {
    console.log(tabName);
    this.activeTab = tabName;
  }

  isAllSelected(){
    //return this.dataSource.data.every(file => file.isSelected);
    return this.uploadedFiles.every(file => file.isSelected);
  }

  selectAll(checked: boolean){
   // this.dataSource.data.forEach(file => (file.isSelected = checked));
    this.uploadedFiles.forEach(file => (file.isSelected = checked));
    console.log(this.uploadedFiles);
  }

  openAction(index: number ,event: MouseEvent, element: File){
    // event.preventDefault();
    // this.isActionOpen = true;
    // this.selectedFile = element;
    this.activeRowIndex = this.activeRowIndex === index ? null : index;
  }
 
  closeAction(){
  //  this.isActionOpen = false;
  this.activeRowIndex = null;
  console.log('Closing action',this.activeRowIndex)
  }

  onUploadAction(action: string, element: File){

  }

  deleteDocument(index: number){
    this.uploadedFiles.splice(index, 1);
    this.uploadedFiles = [...this.uploadedFiles];
    this.showSnackBar();
  
  }

  showSnackBar(){
    this.closeAction();
    this.snackBar.open('Some documents have been deleted from the database. Please retrain the application to retrieve the correct response.',
       'Retrain', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  processNow(): void {
    this.uploadSuccess = false;
    this.uploading = false;
    //this.files = []; // Clear file selection
    this.isShowUploadedFiles = true;
console.log(this.uploadedFiles);
  }

  confirmationOk() {
    

  }

  // processFiles(): void {
  //   setTimeout(() => {
  //     this.uploadSuccess = true;
  //   }, 1000);
  // }
  processLater(): void {
    console.log('Processing later');
    // this.uploadSuccess = false;
    this.uploadSuccess = false;
    this.uploading = false;
    this.files = []; // Clear file selection
  }

  @HostListener('document:click', ['$event']) onClickOutside(event: Event){
    const targetElement = event.target as HTMLElement;
   
    if(this.activeRowIndex !== null && !targetElement.closest('.actions') && !targetElement.closest('mat-icon')){
      this.closeAction();
    }
  }

  upload(){
    if(this.files.length > 0){
      this.uploadFiles();
    }
    else if(this.newLink){
      this.uploadLinks();
    }
  }
}