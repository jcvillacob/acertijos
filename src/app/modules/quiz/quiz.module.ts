import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizHomeComponent } from './components/quiz-home/quiz-home.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    QuizHomeComponent,
    QuizQuestionComponent,
    QuizResultComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
