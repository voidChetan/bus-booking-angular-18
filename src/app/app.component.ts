import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bus-booking-angular-18';
  isLoginForm: boolean = true;

  masterSrv = inject(MasterService)
  loggedUserData:any;
  registerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate":  new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }

  constructor() {
    const localUser=   localStorage.getItem('redBusUser');
    if(localUser != null) {
      this.loggedUserData = JSON.parse(localUser);
    }
  }

  openModel() {
    const model = document.getElementById("myModal");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    const model = document.getElementById("myModal");
    if(model != null) {
      model.style.display = 'none'
    }
  }
  onRegister() {
    this.masterSrv.onRegisterUser(this.registerObj).subscribe((res:any)=> {
      alert("User Registed Success");
      localStorage.setItem('redBusUser', JSON.stringify(res.data))
      this.loggedUserData =  res.data;
      this.closeModel()
    },error=>{
      alert(JSON.stringify(error))
    })
  }

  logoff() {
    localStorage.removeItem('redBusUser')
    this.loggedUserData = undefined;
  }
}
