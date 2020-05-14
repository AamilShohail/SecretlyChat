import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: string[] = [];
  public startConnection = () => {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:57097/chat').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection has been started'))
      .catch(err => console.log('Error while establishing connection: ' + err))
  }
  public adddTransferChatDataListener = () => {
    this._hubConnection.on('SendToAll', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });
  }
  public sendMessage() {
    return this._hubConnection.invoke('SendToAll', localStorage.getItem('currentUser'), localStorage.getItem('currentMessage')).catch(err => { console.error(err) });
  }
  private _hubConnection: HubConnection;
  constructor() { }
}
