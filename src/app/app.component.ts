import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const specialCharacters = [
  '.',
  '*',
  '/',
  '-',
  ';',
  '{',
  '}',
  '[',
  ']',
  '?',
  '\\',
  '+',
  ':',
  '`',
  '~',
  '_',
  '=',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '',
  '|',
  ',',
  ' ',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private readonly fb: FormBuilder) {}

  specialCharacters(): ValidatorFn {
    const error = {
      requiresSpecialCharacters: true,
    };

    return (
      control: AbstractControl<string>
    ): { [key: string]: any } | null => {
      const { value } = control;
      if (!value) {
        return null;
      }
      let valid = false;

      const dotIndex = value
        .split('')
        .findIndex((character) => character === '.');
      if (dotIndex !== -1 && value[dotIndex + 1] === '.') valid = false;

      // if true, return no error, otherwise return the error object passed in the second parameter.
      return valid ? null : error;
    };
  }

  /**
   * firstName,
   * lastName,
   * Address : street, building,
   * emails: array strings => ['mutlaq@gmail', 'mutlaq@code-mint']
   */

  /**
   * Group:
   * Array:
   */
  loginForm = this.fb.group({
    firstName: ['farah', [Validators.required, Validators.maxLength(320)]],
    lastName: ['Mustafa', Validators.required],
    address: this.fb.group({
      street: ['1', [Validators.required, Validators.maxLength(320)]],
      building: ['5', Validators.required],
    }),
    // emails: this.fb.array([
    //   this.fb.control('mutlaq@gmail'),
    //   this.fb.control('mutlaq@code-mint'),
    // ]),
    emails: [['mutlaq@gmail', 'mutlaq@code-mint'], Validators.required],
    colors: [['grey', 'red'], Validators.required],
    variants: this.fb.array([
      this.fb.group({
        size: ['1', Validators.required],
        quantity: ['5', Validators.required],
        color: ['5', Validators.required],
        price: ['5', Validators.required],
      }),
    ]),
  });
  ngOnInit(): void {
    console.log(this.loginForm.value);
  }

  onSubmit() {}

  ngOnDestroy(): void {}
}
// ['l', 'red', 1, 1]
/**
 * [
 * {
 *  color: 'red',
 *
 * }]
 */
