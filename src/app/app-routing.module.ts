import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'home' , pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  { path: 'list', component: UserListComponent},
  { path: 'add', component: UserAddComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
