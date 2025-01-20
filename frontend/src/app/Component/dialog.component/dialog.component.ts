import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from'@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  
  constructor(private dialog: MatDialog,private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
  processNow(result:number){
    //this.dialogRef.close(1);
    this.dialogRef.close(result);
   
  }
  processLater(result:number){
    this.dialogRef.close(0);
  }

}
