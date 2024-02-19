import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/shared/userModel.model';
import { UserDataService } from 'src/shared/userService.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit{
userFormData !: FormGroup;
isEditMode: boolean = false;
selectedUser: User | null = null;
constructor(private userserv : UserDataService , private router : Router){}

ngOnInit(): void {

    this.userFormData = new FormGroup({
      firstname : new FormControl('' , [Validators.required , Validators.min(5)]),
      lastname : new FormControl('' , [Validators.required , Validators.min(5)]),
      email : new FormControl('' , [Validators.required , Validators.email]),
      address : new FormControl(null , [Validators.required] ),
    })
    this.userserv.selectedUser.subscribe(user => {
      if (user) {
        this.isEditMode = true;
        this.selectedUser = user;
        this.userFormData.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address:user.address
        });
      } else {
        this.isEditMode = false;
        this.selectedUser = null;
      }
    });
}
onSubmit(){
  const newUser: User = this.userFormData.value;
  if (this.isEditMode && this.selectedUser) {
    // Update user
    newUser.id = this.selectedUser.id; // Make sure to include user ID for update
    this.userserv.updateUser(newUser,this.selectedUser.id).subscribe(
      updatedUser => {
        console.log('User updated successfully:', updatedUser);
        this.router.navigate([''])
        this.userserv.selectedUser.next(null); 
      }
    );
  } else {
    // Add user
    this.userserv.addUsers(newUser).subscribe(
      addedUser => {
        console.log('User added successfully:', addedUser);
        this.router.navigate([''])
      }
    );
  }
}
}