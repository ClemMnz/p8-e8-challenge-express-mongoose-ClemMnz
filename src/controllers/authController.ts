import { Request, Response } from "express";        // import Request and Response native function from the framework Express.js
import bcrypt from "bcryptjs";                      // import the 'bcryptjs' package 
import User, { IUser } from "../models/User";       //import an instance  and the interface IUser from User Model

export default class AuthController {
  //function to display the login page
  static getLogin(request: Request, response: Response) {
    response.render("login", { title: "Login Page" });
  }

  // delete the session to log out the user  
  static logout(request: Request, response: Response) {
    delete request.session.username;
    response.redirect("/login");
  }
  
   //asynchrone function to login a user
  static async postLogin(request: Request, response: Response) {
    try {
      //get the name of the input username and password and put it in constant.
      const username = request.body.username;
      const password = request.body.password;
      
      console.log(username);
      console.log(password);
      
      //check if username exists en database
      let findUser: IUser = await User.findOne({ name: username });
      console.log(findUser);
      if (!findUser) {
        response.render("login", {
          error: "Votre identifiant est inconnu.",  //send an error to the login view if user doesn't exist.
        });
      }
      // compare the password of the input with the password of the user store in db.
      const passwordisOk = await bcrypt.compareSync(
        password,
        findUser.password
      );
      if (!passwordisOk) {
        response.render("login", {
          error: "Votre mot de passe est invalide.",  // send an error to the login view if password doesn't match.
        });
      }
      request.session.username = findUser.name;        //store the name of the user in session

      console.log("utilisateur connecté!");           
                                              
      response.redirect("/home");                       // redirect to 'home' view
    } catch (error) {
      return error;
    }
  }

  static getSignUp(request: Request, response: Response) {
    response.render("signup", { title: "Signup Page" });            //display the 'signup' view
  }

  //function to register a new User
  static postSignUp(request: Request, response: Response) {
    // check if username has already been created
    User.findOne({ name: request.body.username }).exec((err, user) => {    
      if (user) {
        return response.render("signup", {
          error: "Votre identifiant existe déjà",         //send an error to the signup view if user exists
          title: "Signup Page" 
        });
      }
      let { username, password } = request.body;                //to get the text from the input 'username' and 'password'
      password = bcrypt.hashSync(password, process.env.SALT);      //function to hash the password with a salt
      if (!password) throw Error("Something went wrong saving hash");
    
      let newUser: IUser = new User({ name: username, password });   //instantiate a new User with the data
      console.log(newUser);
      newUser.save((error) => {                            // save the new user
        if (error) {
          throw error;                                     
        } else {
          console.log("utilsateur sauvegardé!");
          return response.redirect("/login");             //redirect to the 'login' view
        }
      });
    });
  }
}
