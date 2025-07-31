import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "@prisma/client";

interface AuthenticatedUser {
  user_id: string;
  email: string;
  session_id: string;
  role: Role;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  image?: string;
  is_banned: boolean;
  locale_id?: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<T = AuthenticatedUser>(err: Error | null, user: T | false): T {
    if (err || !user)
      throw (
        err ||
        new UnauthorizedException("Доступ запрещен. Пожалуйста, авторизуйтесь.")
      );
    return user;
  }
}
