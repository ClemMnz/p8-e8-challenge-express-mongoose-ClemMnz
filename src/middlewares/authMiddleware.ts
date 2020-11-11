import {Request, Response, NextFunction} from 'express';

export default function (request: Request, response: Response, next: NextFunction) {
  // on veux rediriger les utilisateurs non connectés
  if (request.session.username || request.url === '/login' ) {
    next();
  } else {
    response.redirect('/login');
  }
}