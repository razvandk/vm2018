import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { DataService, Match, Team } from '../data.service';

import { interval, pipe } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input() dk: boolean;

  subscription: any;
  countdown: Countdown;
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  live: boolean;
  timer;
  tvIcon: string;

  constructor(private DATA: DataService) { }

  start() {
    this.timer = interval(1000)
      .subscribe(() => {
        this.calculateCountdown();
      });
  }

  reset() {
    if (this.timer && this.timer !== null) {
      this.timer.unsubscribe();
    }
    this.start();
  }

  calculateCountdown() {
    const date = new Date(this.match.date);
    const t = this.DATA.dateDiff(date);

    this.live = (t > 0) ? false : true;

    this.countdown = {
      d: Math.floor(t / (1000 * 60 * 60 * 24)),
      h: Math.floor((t / (1000 * 60 * 60)) % 24),
      m: Math.floor((t / 1000 / 60) % 60),
      s: Math.floor((t / 1000) % 60)
    };
  }

  findTvIcon(channels: string) {
    // this.tvIcon =
  }

  ngOnInit() {
    this.subscription = ((this.dk) ? this.DATA.dkNext : this.DATA.next)
      .subscribe(match => {
        if (!this.match || match.name !== this.match.name ||
          (match.name === this.match.name && (match.home_result !== this.match.home_result || match.away_result !== this.match.away_result))
        ) {
          this.match = match;
          this.reset();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

class Countdown {
  d: number;
  h: number;
  m: number;
  s: number;
}
