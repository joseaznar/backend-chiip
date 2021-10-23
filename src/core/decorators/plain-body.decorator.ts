import * as rawBody from 'raw-body';
import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';

// Edicion Legaspi (Legacy)
// export const PlainBody = createParamDecorator(async (data, req) => {
//     if (req.readable) {
//         return (await rawBody(req)).toString().trim();
//     }
//     const text = req.text();
//     if (!!text) {
//         return text;
//     }
//     throw new HttpException(
//         'Body aint text/plain',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//     );
// });

export const PlainBody = createParamDecorator(
    async (_, context: ExecutionContext) => {
        const req = context
            .switchToHttp()
            .getRequest<import('express').Request>();
        if (!req.readable) {
            throw new BadRequestException('Invalid body');
        }

        const body = (await rawBody(req)).toString('utf8').trim();
        return body;
    },
);
