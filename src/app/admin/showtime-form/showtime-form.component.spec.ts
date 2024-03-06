import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeFormComponent } from './showtime-form.component';

describe('ShowtimeFormComponent', () => {
  let component: ShowtimeFormComponent;
  let fixture: ComponentFixture<ShowtimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowtimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
