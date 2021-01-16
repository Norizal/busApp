import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilepasswordPage } from './profilepassword.page';

describe('ProfilepasswordPage', () => {
  let component: ProfilepasswordPage;
  let fixture: ComponentFixture<ProfilepasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
