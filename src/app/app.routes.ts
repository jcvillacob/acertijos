import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'quiz',
    loadChildren: () =>
      import('./modules/quiz/quiz.module').then((m) => m.QuizModule),
  },
  { path: '', redirectTo: 'quiz/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'quiz/home' },
];
