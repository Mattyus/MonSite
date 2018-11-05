import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDropdownConfig, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class MenuComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  newUser: User;
  modalRegister: any;
  user: User;
  loginError: string;
  closed = false;

  constructor(private config: NgbDropdownConfig, private modalService: NgbModal, private fb: FormBuilder, private authService: AuthService) { 
    config.autoClose = false;
  }

  ngOnInit() {
    if(!this.newUser){
      this.newUser = new User();
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.createForm();
  }

   openModal(content): void {
    this.reset();
    this.modalRegister = this.modalService.open(content);
  }
    
  auth(){
    this.newUser.login = this.loginForm.get('login').value;
    this.newUser.password = this.loginForm.get('password').value;
    this.authService.login(this.newUser).subscribe(res => this.logginUser(res));
  }
    
  logginUser(res){
      if (res.success){
        this.authService.setSession(res);
        this.user = JSON.parse(localStorage.getItem("user"));
      } else {
        console.log(res.msg);
        this.loginError = res.msg;
      }
  }

  createForm() {
    this.registerForm = this.fb.group({
      newLogin: new FormControl(this.newUser.login, [
        Validators.required
      ]),
      newPassword: new FormControl(this.newUser.password, [
        Validators.required
      ])
    });

    this.loginForm = this.fb.group({
      login: new FormControl(this.newUser.login, [
        Validators.required
      ]),
      password: new FormControl(this.newUser.password, [
        Validators.required
      ])
    });
  }
    
  get login() { 
    return this.registerForm.get('login'); 
  }

  get newLogin() { 
    return this.registerForm.get('newLogin'); 
  }

  get password() { 
    return this.registerForm.get('password'); 
  }
    
  get newPassword() { 
    return this.registerForm.get('newPassword'); 
  }

  get isLogged(): boolean {
    return this.authService.getIsLoggedIn();
  }

  register() {
    if (this.registerForm.valid) {
      this.newUser.login = this.registerForm.get('newLogin').value;
      this.newUser.password = this.registerForm.get('newPassword').value;
      this.authService.register(this.newUser).subscribe();
      this.reset();
      this.modalRegister.close();
    }else{
        this.validateAllFormFields(this.registerForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.registerForm.reset();
  }
    
  logout(){
    this.authService.logout();
  }

}
