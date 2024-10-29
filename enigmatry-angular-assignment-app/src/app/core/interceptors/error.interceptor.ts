import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/notifications/notification.service';
import { RouteSegments } from '@shared/model/route-segments';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private readonly errorsToHandle = [
        HttpStatusCode.InternalServerError,
        HttpStatusCode.ServiceUnavailable
    ];

    constructor(private readonly router: Router, private readonly notificationService: NotificationService) { }

    intercept = (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> =>
        next
            .handle(request)
            .pipe(
                catchError(error => {
                    if (this.errorsToHandle.includes(error.status)) {
                        this.router.navigateByUrl(`/${RouteSegments.errors}/${error.status}`);
                        return EMPTY;
                    } else if (error.status !== HttpStatusCode.BadRequest) {
                        this.notificationService.error('Something went wrong!');
                        return EMPTY;
                    }

                     // Bad request (400)
                    return throwError(() => error);
                })
            );
}