import { Component, OnInit, NgZone } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { ChatsService } from 'src/app/shared/chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  constructor(
    private chatService: ChatsService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }
}
