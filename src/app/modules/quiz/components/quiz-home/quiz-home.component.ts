import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.scss'],
})
export class QuizHomeComponent implements AfterViewInit {
  @ViewChild('quizHome') quizHome!: ElementRef;
  @ViewChild('buttons') buttons!: ElementRef;
  @ViewChild('modalRef') modalRef!: ElementRef;
  isModalOpen = false; 

  constructor() {}

  ngAfterViewInit(): void {
    // Animación inicial de entrada
    gsap.from(this.quizHome.nativeElement, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
    });

    // Animación de botones
    gsap.from(this.buttons.nativeElement.children, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
    });
  }

  animateHover(event: MouseEvent, scale: number) {
    gsap.to(event.target, { scale, duration: 0.3, ease: 'power1.out' });
  }

  toggleInstructionsModal() {
    const modalElement = this.modalRef.nativeElement;

    if (this.isModalOpen) {
      // Animación para cerrar el modal
      gsap.to(modalElement, {
        y: 50,
        autoAlpha: 0, 
        duration: 0.8,
        ease: 'back.in(1.7)',
        onComplete: () => {
          this.isModalOpen = false; // Marca el modal como cerrado
          document.body.classList.remove('no-scroll'); // Permitir scroll nuevamente
        },
      });
    } else {
      this.isModalOpen = true; // Marca el modal como abierto
      gsap.fromTo(
        modalElement,
        { y: -100, autoAlpha: 0 }, // Inicialmente oculto y desplazado
        {
          y: 0,
          autoAlpha: 1, // Aparece completamente visible
          duration: 0.8,
          ease: 'back.out(1.7)',
          onComplete: () => {
            document.body.classList.add('no-scroll'); // Deshabilitar scroll
          }
        }
      );
    }
  }

  // Método para cerrar el modal al hacer clic fuera de él
  onModalClick(event: MouseEvent) {
    this.toggleInstructionsModal();
  }

  // Escuchar la tecla Esc para cerrar el modal
  @HostListener('window:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.toggleInstructionsModal();
    }
  }
}
