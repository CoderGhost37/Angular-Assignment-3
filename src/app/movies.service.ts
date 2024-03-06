import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  title: string;
  description: string;
  poster: string;
  trailer: string;
  showtimes: Date[];
  rows: { seats: { label: string; selected: boolean; booked: boolean }[] }[];

  constructor(
    title: string,
    description: string,
    poster: string,
    trailer: string,
    showtimes: Date[]
  ) {
    this.title = title;
    this.description = description;
    this.poster = poster;
    this.trailer = trailer;
    this.showtimes = showtimes;
    this.rows = [
      {
        seats: [
          { label: 'A1', selected: false, booked: false },
          { label: 'A2', selected: false, booked: false },
          { label: 'A3', selected: false, booked: false },
        ],
      },
      {
        seats: [
          { label: 'B1', selected: false, booked: true },
          { label: 'B2', selected: false, booked: false },
          { label: 'B3', selected: false, booked: false },
        ],
      },
      {
        seats: [
          { label: 'C1', selected: false, booked: false },
          { label: 'C2', selected: false, booked: false },
          { label: 'C3', selected: false, booked: false },
        ],
      },
    ];
  }
}

export class MoviesService {
  private movies = [
    new Movie(
      'The Shawshank Redemption',
      'Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.',
      'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
      'https://www.youtube.com/watch?v=6hB3S9bIaco',
      [new Date('2024-03-15T10:30:00'), new Date('2024-04-15T13:30:00')]
    ),
    new Movie(
      'The Godfather',
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
      'https://www.youtube.com/watch?v=sY1S34973zA',
      [new Date('2024-03-15T10:30:00'), new Date('2024-04-15T13:30:00')]
    ),
    new Movie(
      'The Dark Knight',
      'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      'https://www.youtube.com/watch?v=EXeTwQWrcwY',
      [new Date('2024-03-15T10:30:00'), new Date('2024-04-15T13:30:00')]
    ),
  ];
  moviesChanged = new Subject<Movie[]>();

  constructor() {}

  getMovies() {
    return this.movies.slice();
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
  }

  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies.slice());
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());
  }

  getShowtime(movieId: number, showtimeId: number) {
    return this.movies[movieId].showtimes[showtimeId];
  }

  addShowtime(movieId: number, date: Date, time: string) {
    const newShowtime = new Date(date);
    const timeArray = time.split(':');
    newShowtime.setHours(+timeArray[0]);
    newShowtime.setMinutes(+timeArray[1]);

    this.movies[movieId].showtimes.push(newShowtime);
    this.moviesChanged.next(this.movies.slice());
  }

  updateShowtime(
    movieId: number,
    showtimeId: number,
    date: Date,
    time: string
  ) {
    const newShowtime = new Date(date);
    const timeArray = time.split(':');
    newShowtime.setHours(+timeArray[0]);
    newShowtime.setMinutes(+timeArray[1]);

    this.movies[movieId].showtimes[showtimeId] = new Date(newShowtime);
    this.moviesChanged.next(this.movies.slice());
  }

  bookSeats(movieId: number, showtimeId: number, selectedSeats: any[]) {
    selectedSeats.forEach((seat) => {
      this.movies[movieId].rows.forEach((row) => {
        row.seats.forEach((s) => {
          if (s.label === seat.label) {
            s.booked = true;
          }
        });
      });
    });
    this.moviesChanged.next(this.movies.slice());
  }
}
