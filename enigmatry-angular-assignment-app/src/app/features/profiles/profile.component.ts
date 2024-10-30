import { Component, OnInit } from '@angular/core';
import { GetProfileResponse, ProfileClient } from '@api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
//Dummy component
export class ProfileComponent implements OnInit {
  model: GetProfileResponse = new GetProfileResponse({ name: '', email: '' });

  readonly labels = {
    title: $localize`:@@profile.profile.title:Profile Information`,
    name: $localize`:@@profile.profile.name:Name`,
    email: $localize`:@@profile.profile.email:Email`
  };

  constructor(
    private readonly client: ProfileClient
  ) { }


  ngOnInit(): void {
    this.client.getProfile().subscribe(response => {
      this.model = response;
    }
    );
  }
}
