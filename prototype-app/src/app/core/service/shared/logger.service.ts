import { Injectable } from '@angular/core';
import * as log4js from 'log4javascript/log4javascript';

import { environment } from '../../../../environments/environment';
import { Log } from '../../../shared/models';

@Injectable()
export class Logger {

    private readonly _layout: string = ('[%p] %d{MM-dd-yyyy HH:mm:ss,SSS} [%t] %x %c %M - %m%n');
    private readonly _url: string = environment.apiUrls.logger + '/log';

    constructor() { }

    log(log: Log): void {
        let logger = log4js.getLogger('LN Logger');
        let loggingEvent = new log4js.LoggingEvent(logger, new Date(), (<any>log4js.Level)[log.Level], log.Messages)
        let appender = new log4js.AjaxAppender(this._url, false);
        appender.setPostVarName('log');
        logger.addAppender(appender);

        logger.log(loggingEvent.level, [loggingEvent.timeStamp, loggingEvent.exception, loggingEvent.messages]);
    }
}