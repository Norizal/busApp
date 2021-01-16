import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./pages/update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'surveyquestion',
    loadChildren: () => import('./pages/surveyquestion/surveyquestion.module').then( m => m.SurveyquestionPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'profilepassword',
    loadChildren: () => import('./pages/profilepassword/profilepassword.module').then( m => m.ProfilepasswordPageModule)
  },
  {
    path: 'profileupdate',
    loadChildren: () => import('./pages/profileupdate/profileupdate.module').then( m => m.ProfileupdatePageModule)
  },
  {
    path: 'resultdriver',
    loadChildren: () => import('./pages/resultdriver/resultdriver.module').then( m => m.ResultdriverPageModule)
  },
  {
    path: 'resultpassenger',
    loadChildren: () => import('./pages/resultpassenger/resultpassenger.module').then( m => m.ResultpassengerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
