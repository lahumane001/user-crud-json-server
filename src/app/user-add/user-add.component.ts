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
allUser:User[] = [];
authUser:User | undefined;
isEditMode: boolean = false;
selectedUser: User | null = null;
constructor(private userserv : UserDataService , private router : Router){}

ngOnInit(): void {
  this.userserv.getUsers().subscribe((res =>{
    console.log(res)
    this.allUser = res;
    console.log(this.allUser);
   }))
   
    this.userFormData = new FormGroup({
      firstname : new FormControl('' , [Validators.required , Validators.min(5)]),
      lastname : new FormControl('' , [Validators.required , Validators.min(5)]),
      email : new FormControl('' , [Validators.required , Validators.email]),
      contact : new FormControl('' , [Validators.required ,Validators.minLength(10), Validators.maxLength(10)]),
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
          contact:user.contact,
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
        this.router.navigate(['list'])
        this.userserv.selectedUser.next(null); 
      }
    );
  } else {
    // Add user
   this.authUser = this.allUser.find(user =>{
    return user.firstname == this.userFormData.value.firstname
   })
   if(this.authUser?.email == this.userFormData.value.email){
      alert('this user is already exist')
   }else{
     this.userserv.addUsers(newUser).subscribe(
       addedUser => {
         console.log('User added successfully:', addedUser);
         this.router.navigate(['home'])
       }
     );
  }
  }
}
}