import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef} from'@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-retrian-dialouge',
  standalone: true,
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './retrian-dialouge.component.html',
  styleUrl: './retrian-dialouge.component.scss'
})
export class RetrianDialougeComponent {
  constructor(private dialogRef: MatDialogRef<RetrianDialougeComponent>) {}
  
    ngOnInit() {
      this.dialogRef.disableClose = true;
    }

    closedialog(){
     this. dialogRef.close();
    }
}
