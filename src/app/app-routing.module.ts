import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '',loadChildren: './pages/login/login.module#LoginPageModule' , canActivate: [LoginGuardService]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'  },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },

  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },

  { path: 'story', loadChildren: './pages/story/story.module#StoryPageModule' },
  { path: 'character', loadChildren: './pages/character/character.module#CharacterPageModule' },
  { path: 'init', loadChildren: './pages/init/init.module#InitPageModule' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
