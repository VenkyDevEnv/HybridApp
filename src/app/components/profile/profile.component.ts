import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile.model';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profile: any;
  profiles: Profile[] = [];
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfilesService,
    private toaster: ToastrService,
    private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.profileService.getProfiels().subscribe((res) => {
      this.profiles = res;
      const id = +this.route.snapshot.params['id'];
      this.currentIndex = this.profiles.findIndex(
        (profile) => profile.id === id
      );
      this.profile = this.profiles[this.currentIndex];
      console.log(this.profile);
    });
  }

  @HostListener('swiperight', ['$event'])
  onSwipeRight(event: any) {
    this.navigateNext();
  }

  navigateNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.profiles.length;
    this.router.navigate(['/home', this.profiles[this.currentIndex].id]);
  }

  onClickNo() {
    this.toaster.error('Profile marked not interested!');
  }

  onClickYes() {
    this.toaster.success('Profile marked interested!');
  }

  getAllProfiles() {
    this.profileService.getProfiels().subscribe((res) => {
      console.log(res);
    });
  }

  onClickShortList() {
    this.toaster.info('Shortlisted!');
  }
}
