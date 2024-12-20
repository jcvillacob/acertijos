// quiz-result.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  score: number = 9; // Puntaje fijo
  totalQuestions: number = 10; // Total de preguntas
  message: string = '¡Felicitaciones! Por completar este logro te has ganado una Salchipapa.'; // Mensaje de felicitación

  constructor(private router: Router) {}

  ngOnInit(): void {}

  reiniciarQuiz() {
    this.router.navigate(['/']); // Redirige a la página principal del quiz
  }
}
