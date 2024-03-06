import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Movie, MoviesService } from '../../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent {
  movie: Movie;
  id: number;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.movie = this.moviesService.getMovie(this.id);
    });
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const description = form.value.description;
    const poster = form.value.poster;
    const trailer = form.value.trailer;

    const newMovie = new Movie(
      title,
      description,
      poster,
      trailer,
      this.movie.showtimes
    );
    this.moviesService.updateMovie(this.id, newMovie);
    alert('Movie updated successfully');
    form.reset();
  }
}
