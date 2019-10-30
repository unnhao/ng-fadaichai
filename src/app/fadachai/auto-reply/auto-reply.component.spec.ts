import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoReplyComponent } from './auto-reply.component';

describe('AutoReplyComponent', () => {
  let component: AutoReplyComponent;
  let fixture: ComponentFixture<AutoReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
