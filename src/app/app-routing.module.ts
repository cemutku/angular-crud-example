import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPostComponent } from './views/edit-post/edit-post.component';
import { ViewPostComponent } from './views/view-post/view-post.component';
import { PostsComponent } from './views/posts/posts.component';
import { NotFoundComponent } from './views/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent
  },
  {
    path: 'edit-post/new',
    component: EditPostComponent
  },
  {
    path: 'view-post/:id',
    component: ViewPostComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
