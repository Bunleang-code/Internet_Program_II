import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class ApikeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request & {headers: any }>();
        const apikey = req.headers['x-api-key'];

        if (!apikey || apikey !== process.env.API_KEY){
            throw new UnauthorizedException('invalid API key');
        }
        return true;
    }
}