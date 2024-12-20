import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

interface QuizOption {
  text: string;
  correct: boolean;
  selected?: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements AfterViewInit {
  @ViewChild('quizContainer') quizContainer!: ElementRef;
  @ViewChild('questionElement') questionElement!: ElementRef;

  currentQuestionIndex = 0;
  isOptionDisabled = false;
  isAnimating = false; // Nueva variable para controlar animaciones

  // Preguntas de ejemplo
  questions: QuizQuestion[] = [
    {
      question: '¿Cuál es el idioma más hablado en el mundo?',
      options: [
        { text: 'Inglés', correct: false },
        { text: 'Mandarín', correct: true },
        { text: 'Español', correct: false },
        { text: 'Hindi', correct: false },
      ],
    },
    {
      question: '¿Cuál es la capital de Francia?',
      options: [
        { text: 'Berlín', correct: false },
        { text: 'Madrid', correct: false },
        { text: 'París', correct: true },
        { text: 'Roma', correct: false },
      ],
    },
    {
      question: '¿Quién escribió "Cien años de soledad"?',
      options: [
        { text: 'Mario Vargas Llosa', correct: false },
        { text: 'Gabriel García Márquez', correct: true },
        { text: 'Pablo Neruda', correct: false },
        { text: 'Isabel Allende', correct: false },
      ],
    },
  ];

  constructor(private router: Router) {}

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  ngAfterViewInit(): void {
    this.animateQuestionEntry();
  }

  selectAnswer(option: QuizOption) {
    if (this.isOptionDisabled || this.isAnimating) return; // Prevenir múltiples clics durante animaciones
    this.isOptionDisabled = true;
    this.isAnimating = true;

    // Marcar la opción seleccionada
    this.currentQuestion.options.forEach((opt) => (opt.selected = false));
    option.selected = true;

    // Animar la salida de la pregunta actual
    this.animateQuestionExit(() => {
      // Incrementar el índice de la pregunta
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
        // Reiniciar las selecciones para la nueva pregunta
        this.resetSelections();

        // Animar la entrada de la nueva pregunta
        this.animateQuestionEntry();
      } else {
        this.finishQuiz();
      }

      this.isOptionDisabled = false;
      this.isAnimating = false;
    });
  }

  resetSelections() {
    this.questions[this.currentQuestionIndex]?.options.forEach((option) => {
      option.selected = false;
    });
  }

  finishQuiz() {
    this.router.navigate(['/quiz/result']);
  }

  animateQuestionEntry() {
    gsap.fromTo(
      this.questionElement.nativeElement,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  animateQuestionExit(onComplete: () => void) {
    gsap.to(this.questionElement.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power2.in',
      onComplete,
    });
  }
}
