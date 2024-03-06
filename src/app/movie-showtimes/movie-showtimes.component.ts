import { Component } from '@angular/core';
import { Movie, MoviesService } from '../movies.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-movie-showtimes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './movie-showtimes.component.html',
  styleUrl: './movie-showtimes.component.css',
})
export class MovieShowtimesComponent {
  movie: Movie;
  id: number;
  user: User = null;

  constructor(
    private authService: AuthService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.movie = this.moviesService.getMovie(this.id);
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  onBookShowtime(showtimeId: number) {
    if (this.user.role === 'User') {
      this.router.navigate(['../book', showtimeId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/admin/edit-showtime', showtimeId], {
        queryParams: { edit: 1, showtimeId: showtimeId },
      });
    }
  }

  addShowtime() {
    this.router.navigate(['/admin/add-showtime', this.id], {
      queryParams: { edit: 0 },
    });
  }
}
