import { Injectable } from '@angular/core';
import { ChartModel } from '../_interfaces/chartmodel.model';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public data: ChartModel[];
  public startConnection = () => {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:57097/chart').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection has been started'))
      .catch(err => console.log('Error while establishing connection: ' + err))
  }

  public adddTransferChartDataListener = () => {
    this._hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  private _hubConnection: HubConnection;
  constructor() { }
}
