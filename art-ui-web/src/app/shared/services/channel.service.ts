import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChannelData } from '../models/channel-data.model';

@Injectable()
export class ChannelService {

    private static channel = new BehaviorSubject<ChannelData>(new ChannelData());

    public static watch(): Observable<ChannelData> {
        return this.channel.asObservable();
    }

    public static broadcast(message: ChannelData) {
        this.channel.next(message);
    }

    constructor() { }
}
