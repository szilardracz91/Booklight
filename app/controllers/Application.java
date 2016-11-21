package controllers;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import views.html.login;


public class Application extends Controller {

    public static Result authenticate() {
        Form<Login> loginForm = Form.form(Login.class).bindFromRequest();
        return ok();
    }

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result login() {
        return ok(
                login.render(Form.form(Login.class))
        );
    }

    public static class Login {

        public String email;
        public String password;

    }

}