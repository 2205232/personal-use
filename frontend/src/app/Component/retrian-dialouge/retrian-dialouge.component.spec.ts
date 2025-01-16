import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrianDialougeComponent } from './retrian-dialouge.component';

describe('RetrianDialougeComponent', () => {
  let component: RetrianDialougeComponent;
  let fixture: ComponentFixture<RetrianDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrianDialougeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrianDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
