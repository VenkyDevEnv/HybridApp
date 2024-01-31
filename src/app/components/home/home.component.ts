import { CSP_NONCE, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile.model';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ProfilesService,
    private toaster: ToastrService
  ) {}
  public profiles: Profile[] = [];

  ngOnInit(): void {
    this.onGetProfiles();
  }

  onClickYes(id: number): void {
    this.toaster.success('Full Profile view!');
    this.router.navigate(['/profile', id]);
  }

  onGetProfiles() {
    this.service.getProfiels().subscribe((res) => {
      this.profiles = res;
    });
  }

  onClickNo() {
    this.toaster.warning('Profile Rejected!');
    this.router.navigate(['/home']);
  }
}
