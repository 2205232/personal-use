import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {
  private promptsPerPageSubject = new BehaviorSubject<number>(4);
  promptsPerPage$ = this.promptsPerPageSubject.asObservable();
  constructor() { }

  setPromptsPerPage(value: number) {
    console.log(value);
    this.promptsPerPageSubject.next(value);
  }
}
