import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummaryCardsComponent } from './users-summary-cards.component';

describe('UsersSummaryCardsComponent', () => {
  let component: UsersSummaryCardsComponent;
  let fixture: ComponentFixture<UsersSummaryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSummaryCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
