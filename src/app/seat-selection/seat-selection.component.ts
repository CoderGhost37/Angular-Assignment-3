import { Component } from '@angular/core';
import { Movie, MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent {
  movie: Movie;
  id: number;
  showtimeId: number;
  selectedSeats = [];

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

  toggleSeatSelection(rowIndex: number, seatIndex: number): void {
    const seat = this.movie.rows[rowIndex].seats[seatIndex];
    if (seat.booked) {
      return;
    }
    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats = this.selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
    }
  }

  onBookSeats() {
    const bookedSeats = this.selectedSeats.map((seat) => seat.label);
    this.moviesService.bookSeats(this.id, this.showtimeId, this.selectedSeats);
    this.router.navigate(['/review-booking', this.id], {
      queryParams: { showtimeId: this.showtimeId, seats: bookedSeats },
    });
  }
}
