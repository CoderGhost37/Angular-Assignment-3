import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {
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

  onMovieClick(index: number) {
    this.router.navigate(['/movie', index]);
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }
}
