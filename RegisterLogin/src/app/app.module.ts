import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ChartsModule } from "ng2-charts";
import { ChartService } from './shared/chart.service';
import { ChartComponent } from './home/chart/chart.component';
import { ChatComponent } from './home/chat/chat.component';
import { ChatService } from './shared/chat.service';
import { ChatsComponent } from './home/chats/chats.component';
import { ChatsService } from './shared/chats.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    ChartComponent,
    ChatComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    ChartsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, ChartService, ChatService, ChatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
