import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    code: string | null;
    message: string = $localize`:@@errors.message:ERROR`;

    constructor(private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        this.code = this.route.snapshot.paramMap.get('code');
        if (this.code === HttpStatusCode.InternalServerError.toString()) {
            this.message += $localize`:@@errors.500:Internal Server Error!`;
        } else if (this.code === HttpStatusCode.ServiceUnavailable.toString()) {
            this.message += $localize`:@@errors.503:Service Unavailable!`;
        }
    }
}
