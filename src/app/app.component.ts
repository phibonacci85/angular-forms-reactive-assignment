import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'project': new FormControl(null, [Validators.required, this.forbiddenProjectName],
        this.asyncForbiddenProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('critical', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'projectNameForbidden': true};
    } else {
      return null;
    }
  }

  asyncForbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Demo') {
            resolve({'projectNameForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
      },
    );
    return promise;
  }
}
