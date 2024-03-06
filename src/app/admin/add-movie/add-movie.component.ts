import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Movie, MoviesService } from '../../movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent {
  constructor(private moviesService: MoviesService) {}

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const description = form.value.description;
    const poster = form.value.poster;
    const trailer = form.value.trailer;

    const newMovie = new Movie(title, description, poster, trailer, []);
    this.moviesService.addMovie(newMovie);
    alert('Movie added successfully');
    form.reset();
  }
}
