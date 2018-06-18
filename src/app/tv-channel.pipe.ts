import { Pipe, PipeTransform } from '@angular/core';
import { DataService, TvChannel } from './data.service';

@Pipe({ name: 'tvChannelPipe' })
export class TvChannelPipe implements PipeTransform {

  constructor(private DATA: DataService) { }
  transform(index: number, type: string): string {
    const channel: TvChannel = this.DATA.tvChannels[index - 1] as TvChannel;
    return (type === 'icon') ? channel.icon : channel.name;
  }
}
