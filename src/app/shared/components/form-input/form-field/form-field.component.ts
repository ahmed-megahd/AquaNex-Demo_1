import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
})
export class FormFieldComponent {
  label = input.required<string>();
  control = input.required<AbstractControl | null>();

  isRequired = computed(() => {
    const ctrl = this.control();
    if (!ctrl) return false;

    // Check if control has required validator
    return ctrl.hasValidator(Validators.required);
  });

  getError(errors: ValidationErrors | null): string {
    if (!errors) return '';
    if (errors['required']) return 'This field is required.';
    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required.`;
    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
    if (errors['email']) return 'Invalid email address.';
    if (errors['pattern']) return 'Invalid format.';
    return 'Invalid value.';
  }
}
