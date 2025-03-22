import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeactivatedFormComponent } from './users-deactivated-form.component';

describe('UsersDeactivatedFormComponent', () => {
  let component: UsersDeactivatedFormComponent;
  let fixture: ComponentFixture<UsersDeactivatedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDeactivatedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeactivatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
