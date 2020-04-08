import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post: Post;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id && id > 0) {
      this.postService.getPost(id).subscribe({
        next: (post: Post) => this.post = post,
        error: () => this.router.navigate(["not-found"])
      });
    }
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }
}
