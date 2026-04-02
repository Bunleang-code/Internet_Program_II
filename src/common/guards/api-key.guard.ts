import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class ApikeyGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const apikey = req.headers['x-api-key'];

        if (!apikey || apikey !== process.env.API_KEY){
            throw new UnauthorizedException('invalid API key');
        }
        return true;
    }
}