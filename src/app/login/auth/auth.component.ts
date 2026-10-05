import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { decodeDemoCredentials } from 'src/app/utils/demo-credentials';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAuth: boolean = true;
  authForm: FormGroup;
  signInForm: FormGroup;
  userName: string = '';
  email: string = '';
  password: string = '';
  regExpPass = /^[A-Za-z\d+=]{6,30}$/gm;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      userName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.regExpPass)])
    });
    this.signInForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.regExpPass)])
    });

    // Prefills sign-in form when portfolio opens the demo with encoded credentials.
    this.route.queryParamMap.subscribe((params) => {
      const demoToken = params.get('demo');
      if (!demoToken) {
        return;
      }

      const credentials = decodeDemoCredentials(demoToken);
      if (!credentials) {
        return;
      }

      this.isAuth = true;
      this.signInForm.patchValue({
        email: credentials.u,
        password: credentials.p
      });
    });
  }

  signUp(): void {
    this.dataService.signUp(this.authForm.value);
  }

  signIn(): void {
    this.dataService.signIn(this.signInForm.value);
  }

  changeChoise(): void {
    this.isAuth = !this.isAuth;
  }
}
