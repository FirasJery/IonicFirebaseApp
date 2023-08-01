import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCompteurPage } from './add-compteur.page';

describe('AddCompteurPage', () => {
  let component: AddCompteurPage;
  let fixture: ComponentFixture<AddCompteurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCompteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
