import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies/movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: 'movie/:id',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./movie-detail/movie-detail.component').then(
            (m) => m.MovieDetailComponent
          ),
      },
      {
        path: 'showtimes',
        loadComponent: () =>
          import('./movie-showtimes/movie-showtimes.component').then(
            (m) => m.MovieShowtimesComponent
          ),
      },
      {
        path: 'book/:showtimeId',
        loadComponent: () =>
          import('./seat-selection/seat-selection.component').then(
            (m) => m.SeatSelectionComponent
          ),
      },
    ],
  },
  {
    path: 'review-booking/:bookingId',
    loadComponent: () =>
      import('./review-booking/review-booking.component').then(
        (m) => m.ReviewBookingComponent
      ),
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'movie',
        children: [
          {
            path: 'add',
            loadComponent: () =>
              import('./admin/add-movie/add-movie.component').then(
                (m) => m.AddMovieComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./admin/edit-movie/edit-movie.component').then(
                (m) => m.EditMovieComponent
              ),
          },
        ],
      },
      {
        path: 'add-showtime/:movieId',
        loadComponent: () =>
          import('./admin/showtime-form/showtime-form.component').then(
            (m) => m.ShowtimeFormComponent
          ),
      },
      {
        path: 'edit-showtime/:movieId',
        loadComponent: () =>
          import('./admin/showtime-form/showtime-form.component').then(
            (m) => m.ShowtimeFormComponent
          ),
      },
    ],
  },
];
