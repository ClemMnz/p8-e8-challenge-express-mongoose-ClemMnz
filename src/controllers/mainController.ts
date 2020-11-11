import {Request, Response} from 'express';

export default class MainController {


  static index(request : Request,response: Response) {
    response.render('index',{ title: 'Index'});
  }

  static home(request : Request,response: Response) {
    response.render('home', {
      title: 'Home Page',
      username: request.session.username
    });
  }


}