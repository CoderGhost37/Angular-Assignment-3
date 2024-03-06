import { Component } from '@angular/core';
import { Movie, MoviesService } from '../../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-showtime-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './showtime-form.component.html',
  styleUrl: './showtime-form.component.css',
})
export class ShowtimeFormComponent {
  showtime;
  movieId: number;
  showtimeId: number;
  isEditMode = false;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isEditMode = this.route.snapshot.queryParams['edit'] === '1';
    this.showtimeId = +this.route.snapshot.queryParams['showtimeId'];
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      if (this.isEditMode) {
        this.showtime = this.moviesService.getShowtime(
          this.movieId,
          this.showtimeId
        );
      }
    });
  }

  onSubmit(form: NgForm) {
    const date = form.value.date;
    const time = form.value.time;

    if (this.isEditMode) {
      // this.moviesService.updateShowtime(
      //   this.movieId,
      //   this.showtimeId,
      //   date,
      //   time,
      //   price,
      //   hall
      // );
    } else {
      this.moviesService.addShowtime(this.movieId, date, time);
    }
    alert('Showtime updated successfully');
    form.reset();
    this.router.navigate(['/movie', this.movieId, 'showtimes']);
  }
}
