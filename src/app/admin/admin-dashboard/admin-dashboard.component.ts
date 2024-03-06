import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, MoviesService } from '../../movies.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  movies = [];
  private movieSub: Subscription;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.movieSub = this.moviesService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.movies = this.moviesService.getMovies();
  }

  onDeleteMovieClick(index: number) {
    confirm('Are you sure you want to delete this movie?');
    this.moviesService.deleteMovie(index);
  }

  onEditMovieClick(index: number) {
    this.router.navigate(['/admin/movie/edit', index]);
  }

  onViewShowtimeClick(index: number) {
    this.router.navigate(['/movie', index, 'showtimes']);
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }
}
