import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
  imports: [],
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

  loginForm = this.fb.group({
    email: [
      'farah',
      [
        Validators.required,
        Validators.maxLength(320),
        this.specialCharacters(),
      ],
    ],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
    console.log(this.loginForm.value);
  }

  ngOnDestroy(): void {}
}
