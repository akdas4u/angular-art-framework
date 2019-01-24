import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appCelularMask]',
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    // Considerando que o input de celular aceite os formatos:
    //   1. (99) 9 9999-9999;
    //   2. (99) 9999-9999;

    let numero = event.replace(/\D/g, '');
    if (backspace && numero.length <= 11) {
      numero = numero.substring(0, numero.length);
    }

    if (numero.length === 0) {
      numero = '';
    } else if (numero.length <= 2) {
      // Contendo apenas o DDD
      numero = numero.replace(/^(\d{0,2})/, '($1)');
    } else if (numero.length <= 6) {
      // Contendo o DDD e o Prefixo
      numero = numero.replace(/^(\d{0,2})(\d{0,4})/, '($1) $2');
    } else if (numero.length <= 10) {
      // Contendo o DDD, Prefixo e Sufixo
      numero = numero.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else if (numero.length === 11) {
      // Contendo o número completo
      numero = numero.replace(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
    } else {
      // Truncando o valor para manter ao tamanho máximo pré-estabelicido
      numero = numero.substring(0, 11);
      numero = numero.replace(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
    }

    this.ngControl.valueAccessor.writeValue(numero);
  }
}
