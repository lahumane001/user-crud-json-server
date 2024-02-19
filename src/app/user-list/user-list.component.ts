import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/shared/userService.service';
import { User } from 'src/shared/userModel.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

allUserData:User[]=[];  

  constructor(private userServ : UserDataService ,private router : Router){}
  
  
  ngOnInit(): void {
  this.fetchData()
  }
  fetchData(){
    this.userServ.getUsers().subscribe((res =>{
      console.log(res)
      this.allUserData = res;
     }))
  }

  OnDelete(id:number){
    // this.allUserData.splice( id, 1)
    this.userServ.deleteUser(id).subscribe(()=>{
      console.log('delete this user')
      this.fetchData()
    })

 console.log(id)
  }

  editData(user:User){
    this.userServ.selectedUser.next(user);
    this.router.navigate(['/add']);
  }
}