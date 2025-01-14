import { HttpHandler,
        HttpInterceptor,
        HttpRequest,
 } from "@angular/common/http";
import { Injectable } from "@angular/core";


 @Injectable()

 export class AuthInterceptorService implements HttpInterceptor{
     intercept(req:HttpRequest<any>,next:HttpHandler){
         const token = localStorage.getItem('accessToken');
         
         if (!token){
            return next.handle(req);
         }

         const authRequest = req.clone({
            headers:req.headers.set('Authorization','Bearer '+token),
            withCredentials:true
        });

        return next.handle(authRequest);
    }
}