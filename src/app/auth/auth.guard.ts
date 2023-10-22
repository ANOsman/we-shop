import { CanActivateFn, CanLoadFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn | CanLoadFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isLoggedIn) { return true }
    return router.parseUrl('/');
}