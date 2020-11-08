import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {
  }

  private readonly spinnerClassName = 'visible';
  private readonly loaderElementID = 'loader'
  private readonly overlayElementID = 'overlay'
  private readonly overlayClassName = '_overlay';

  private spinnerElement = document.getElementById(this.loaderElementID);
  private overlayElement = document.getElementById(this.overlayElementID);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.showLoader();
    return next.handle(request)
      .pipe(
        tap
          (event => {
            if (event.type === HttpEventType.Response) {
              this.hideLoader();
            }
          }),
        catchError((err: HttpErrorResponse, caught) => {
          this.forceHideLoader();
          return throwError(err);
        }));
  }

  public hideLoader = () => {
    if ((--this.loader.spinnerCount) <= 0) {
      this.forceHideLoader();
    }
  }

  public forceHideLoader = () => {
      this.spinnerElement.classList.remove(this.spinnerClassName);
      this.overlayElement.classList.remove(this.overlayClassName);
  }

  public showLoader = () => {
      this.setSpinnerElements();
      if (this.spinnerElement && this.overlayElement) {
        this.spinnerElement.classList.add(this.spinnerClassName);
        this.overlayElement.classList.add(this.overlayClassName);
      }
  }

  private setSpinnerElements = () => {
    this.spinnerElement = document.getElementById(this.loaderElementID);
    this.overlayElement = document.getElementById(this.overlayElementID);
  }
}
