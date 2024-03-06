import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-booking.component.html',
  styleUrl: './review-booking.component.css',
})
export class ReviewBookingComponent {
  movie: Movie;
  movieId: number;
  showtimeId: number;
  selectedSeats: any[];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.movie = this.moviesService.getMovie(this.movieId);
    });
    this.route.queryParams.subscribe((params) => {
      this.showtimeId = +params['showtimeId'];
      this.selectedSeats = params['seats'];
    });
    console.log(this.showtimeId, this.selectedSeats);
  }
}
