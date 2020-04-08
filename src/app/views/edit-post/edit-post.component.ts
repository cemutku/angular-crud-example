import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  pageTitle: string = '';
  post: Post = new Post();

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    if (id && id > 0) {
      this.pageTitle = 'Edit Post';
      this.postService.getPost(id).subscribe({
        next: (post: Post) => this.post = post,
        error: err => this.onError(err)
      });
    }
    else {
      this.pageTitle = 'Add New Post'
    }
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }

  onSubmit(): void {
    if (this.post.id && this.post.id > 0) {
      this.postService.updatePost(this.post).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.onError(err)
      });
    } else {
      this.postService.savePost(this.post).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.onError(err)
      });
    }
  }

  onSaveComplete(): void {
    this.toastr.success('Save Successful');
    this.router.navigate(["/"])
  }

  onError(error: any): void {
    this.toastr.error(error.message);
  }
}
