import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { TeamPipe } from './team.pipe';
import { TvChannelPipe } from './tv-channel.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    TeamPipe,
    TvChannelPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
