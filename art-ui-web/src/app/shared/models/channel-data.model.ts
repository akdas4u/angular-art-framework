import { ChannelTypeEnum } from '../enums/channel-type.enum';

export class ChannelData {
    type: ChannelTypeEnum;
    data: any;

    constructor(type: ChannelTypeEnum = ChannelTypeEnum.Unknow, data?: any) {
        this.type = type;
        this.data = data;
    }
}
