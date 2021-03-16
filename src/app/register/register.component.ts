import {Component, OnInit} from '@angular/core';
import {User} from '../Model/UserModel/userModel';
import {UserService} from '../Model/UserModel/user.service';
import {Router} from '@angular/router';
import {GuardService} from '../guard/guard.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User;
  }

  register() {
    this.userService.createUser(this.user).subscribe(row => {
      this.user = new User;
      this.router.navigate(['']);
    }, row => {
      console.log(row)
      alert('Error')
    });
  }


}
