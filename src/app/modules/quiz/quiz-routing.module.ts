import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizHomeComponent } from './components/quiz-home/quiz-home.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: QuizHomeComponent },
  { path: 'question', component: QuizQuestionComponent },
  { path: 'result', component: QuizResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
