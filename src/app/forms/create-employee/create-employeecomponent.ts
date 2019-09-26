import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../Iskill';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  public imagePath;
  pageTitle;
  imgURL: any;
  employee;
  employeeID;
  public message: string;
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'phone': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be hanumanthnbalu.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm E-mail not matched.'
    },
    'phone': {
      'required': 'Phone number is required.'
    }
  };
  constructor(private fb: FormBuilder, 
              private employeeService: EmployeeService, 
              private router: ActivatedRoute,
              private routers: Router) { }
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });
    this.router.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => this.editEmployee(employee),
        (err: any) => console.log(err)
      );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }
  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
    return formArray;
  }
  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls ) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  preview(files: any) {
    if (files.length === 0) { return; }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }


  // onLoadDataClick(): void {
  //   const formArray = new FormArray([
  //     new FormControl('HNB', Validators.required),
  //     new FormGroup({
  //       country: new FormControl('', Validators.required)}),
  //       new FormArray([])
  //   ]);

  //   const formArray1 = this.fb.array([
  //     new FormControl('HNB', Validators.required),
  //     new FormControl('IT', Validators.required),
  //     new FormControl('Male', Validators.required),
  //   ]);

  //   const formGroup = this.fb.group([
  //     new FormControl('HNB', Validators.required),
  //     new FormControl('IT', Validators.required),
  //     new FormControl('Male', Validators.required),
  //   ]);
  //   formArray1.push(new FormControl('HANU', Validators.required));
  //   console.log(formArray1.at(3).value);
  //   console.log(formGroup);
  //   console.log(formArray);
  // }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  removeSkills(skillGroupIndex: number): void {
    const skillFormArray = (<FormArray>this.employeeForm.get('skills'));
    skillFormArray.removeAt(skillGroupIndex);
    skillFormArray.markAsDirty();
    skillFormArray.markAsTouched();
  }

  onSubmit(): void {
    const employee: any = {
      id: this.employeeID,
      fullName : this.employeeForm.value.fullName,
      contactPreference: this.employeeForm.value.contactPreference,
      email: this.employeeForm.value.emailGroup.email,
      phone: this.employeeForm.value.phone,
      skills: this.employeeForm.value.skills
    };
    if (this.employeeID) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.routers.navigate(['employees']),
        (err: any) => console.log(err)
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.routers.navigate(['employees']),
        (err: any) => console.log(err)
      );
    }
  }

}

function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}
