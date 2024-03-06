import { Component } from '@angular/core';
import { Movie, MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent {
  movie: Movie;
  id: number;
  showtimeId: number;
  selectedSeats: number[] = [];

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.showtimeId = +params['showtimeId'];
      this.movie = this.moviesService.getMovie(this.id);
    });
  }

  onBookSeats() {}
}
