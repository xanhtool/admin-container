export class PostInformation {
    view: number;
    love: number;
    comment: number;
    constructor(info:{
        view?: number,
        love?: number,
        comment?: number
    }={}) {
        this.view = info.view || 0;
        this.love = info.love || 0;
        this.comment = info.comment || 0;
    }

}