import { Pipe, PipeTransform } from '@angular/core';
import { DataService, Team } from './data.service';

@Pipe({ name: 'teamPipe' })
export class TeamPipe implements PipeTransform {

  constructor(private DATA: DataService) { }
  transform(index: number): string {
    const team: Team = this.DATA.teams[index - 1] as Team;
    // const team: Team = this.DATA.teams.find(x => x.id === index);

    return team.name;
  }
}
