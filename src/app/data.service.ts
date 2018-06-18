import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { environment } from '../environments/environment';

import { interval, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  timer: any;
  knockoutDate: Date = new Date('2018-06-30T00:00');

  teams: Team[];
  tvChannels: TvChannel[];

  next = new Subject<any>();
  dkNext = new Subject<any>();

  constructor(private API: ApiService) { }

  start() {
    this.timer = interval(1000 * 60 * environment.REFRESH_RATE)
      .pipe( startWith(0) )
      .subscribe(() => this.API.makeRequest('data.json')
        .then(r => {
          if (!this.teams) {
            this.teams = r.teams;
          }
          if (!this.tvChannels) {
            this.tvChannels = r.tvchannels;
          }

          const matches = (this.dateDiff(this.knockoutDate) < 0) ? r.knockout : r.groups;

          this.setNextGames(matches);

        })
      );
  }

  setNextGames(data) {
    let nextMatch: Match;
    let nextMatchDate: number;

    let nextDkMatch: Match;
    let nextDkMatchDate: number;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key].matches.forEach(match => {
          const diff = this.dateDiff(new Date(match.date));
          if (!match.finished) {
            if (match.home_team === 11 || match.away_team === 11) {
              if (!nextDkMatchDate || nextDkMatchDate > diff) {
                nextDkMatchDate = diff;
                nextDkMatch = match;
              }
            } else if (!nextMatchDate || nextMatchDate > diff) {
              nextMatchDate = diff;
              nextMatch = match;
            }
          }
        });
      }
    }
    this.next.next(nextMatch);
    this.dkNext.next(nextDkMatch);
  }

  stop() {
    if (this.timer && this.timer !== null) {
      this.timer.unsubscribe();
    }
  }

  reset() {
    this.stop();
    this.start();
  }

  dateDiff(date1: Date, date2: Date = new Date()) {
    return date1.getTime() - date2.getTime();
  }
}

export class Team {
  id: number;
  name: string;
  fifaCode: string;
  flag: string;
  emoji: string;
  emojiString: string;
}

export class TvChannel {
  id: number;
  name: string;
  country: string;
  icon: string;
}

export class Match {
  name: number;
  stadium: number;
  home_team: number;
  away_team: number;
  type: string;
  finished: boolean;
  home_result: string;
  away_result: string;
  date: Date;
  channels: number[];
  matchday: number;
}
