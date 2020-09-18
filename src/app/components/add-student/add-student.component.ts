import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList') chipList;
  @ViewChild('resetStudentForm') myNgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService
  ) { }

  ngOnInit(): void {
    this.submitBookForm();
  }

  /* Reactive book form */
  submitBookForm(): void{
    this.studentForm = this.fb.group({
      studentName: ['', [Validators.required]],
      studentEmail: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

   /* Add dynamic languages */
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
   }
}
