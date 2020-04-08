import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  private _searchKey: string = '';
  get searchKey(): string {
    return this._searchKey;
  }
  set searchKey(value: string) {
    this._searchKey = value;
    this.postService.search(value).subscribe({
      next: (posts: Post[]) => this.posts = posts,
      error: err => this.onError(err)
    });
  }

  constructor(
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts: Post[]) => this.posts = posts,
      error: err => this.onError(err)
    });
  }

  editPost(id: number): void {
    this.router.navigate(["edit-post", id]);
  }

  addNewPost(): void {
    this.router.navigate(["edit-post", "new"]);
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.toastr.success('Delete Successful')
        this.posts = this.posts.filter(item => item.id !== id)
      },
      error: err => this.onError(err)
    });
  }

  viewPost(id: number): void {
    this.router.navigate(["view-post", id]);
  }

  onError(error: any): void {
    this.toastr.error(error.message)
  }
}
