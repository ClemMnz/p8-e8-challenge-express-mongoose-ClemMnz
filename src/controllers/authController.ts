import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

export default class AuthController {
  static getLogin(request: Request, response: Response) {
    response.render("login", { title: "Login Page" });
  }

  static logout(request: Request, response: Response) {
    delete request.session.username;
    response.redirect("/login");
  }

  static async postLogin(request: Request, response: Response) {
    try {
      const username = request.body.username;
      const password = request.body.password;
      //let {username, password}= request.body;
      console.log(username);
      console.log(password);
      let findUser: IUser = await User.findOne({ name: username });
      console.log(findUser);
      if (!findUser) {
        response.render("login", {
          error: "Votre identifiant est inconnu.",
        });
      }
      const passwordisOk = await bcrypt.compareSync(
        password,
        findUser.password
      );
      if (!passwordisOk) {
        response.render("login", {
          error: "Votre mot de passe est invalide.",
        });
      }
      request.session.username = findUser.name;

      console.log("utilisateur connecté!");
      response.redirect("/home");
    } catch (error) {
      return error;
    }
  }

  static getSignUp(request: Request, response: Response) {
    response.render("signup", { title: "Signup Page" });
  }

  static postSignUp(request: Request, response: Response) {
    User.findOne({ name: request.body.username }).exec((err, user) => {
      if (user) {
        return response.render("signup", {
          error: "Votre identifiant existe déjà",
          title: "Signup Page" 
        });
      }
      let { username, password } = request.body;
      password = bcrypt.hashSync(password, process.env.SALT);
      if (!password) throw Error("Something went wrong saving hash");
      console.log(password);
      let newUser: IUser = new User({ name: username, password });
      console.log(newUser);
      newUser.save((error) => {
        if (error) {
          throw error;
        } else {
          console.log("utilsateur sauvegardé!");
          return response.redirect("/login");
        }
      });
    });
  }
}
