import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  message = '';
  private _hubConnection: HubConnection;
  constructor(public service: ChatService, private toastr: ToastrService) { }

  chatForm: NgForm;
  ngOnInit(): void {
    this.service.startConnection();
    this.service.adddTransferChatDataListener();
  }

  startChat() {
    localStorage.setItem('currentMessage', this.message);
    this.service.sendMessage();
    this.toastr.success('Your Message has been sent', 'Message Service');
  }
}
