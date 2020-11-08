import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse, caught) => {
          this.snackbarService.error( `Network error occured: ${error.message}`);
          console.error('Caught http-event:', caught);
          return throwError(error);
        }));
  }
}
