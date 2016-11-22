package controllers;

import com.avaje.ebean.Model;
import models.Book;
import models.User;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;
import views.html.login;

import java.util.List;

import static play.libs.Json.toJson;



public class Application extends Controller {

    public static Result authenticate() {
        Form<Login> loginForm = Form.form(Login.class).bindFromRequest();
        if (loginForm.hasErrors()) {
            return badRequest(login.render(loginForm));
        } else {
            session().clear();
            session("email", loginForm.get().email);
            return redirect(
                    routes.Application.index()
            );
        }
    }

    public static Result addNewUser() {
        new User("leskoBandi@gmail.com", "Bob", "secret").save();
        return ok("csa");
    }

    public static Result addNewBooks() {
        new Book("Trónok harc", "George R.R Martin", "Epikus fantasy, nem középszerű").save();
        new Book("Harry Potter és Tűz serlege", "J. K. Rowlings","Varázslatos árvíztűrőtükörfúrógép").save();
        new Book("Logikai rendszerek tervezése", "Arató Péter","Az ifjúsági irodalom legjava").save();
        return ok("Some Books added");
    }

    @Security.Authenticated(Secured.class)
    public static Result index() {
        return ok(index.render("sziamia", User.find.byId(request().username() )));
    }

    public static Result login() {
        return ok(
                login.render(Form.form(Login.class))
        );
    }

    public static class Login {

        public String email;
        public String password;

        public String validate() {
            if (User.authenticate(email, password) == null) {
                return "Invalid user or password";
            }
            return null;
        }

    }

    public static Result logout() {
        session().clear();
        flash("success", "You've been logged out");
        return redirect(
                routes.Application.login()
        );
    }

    public static Result getBooks(){
        List<Book> books = new Model.Finder(String.class, Book.class).all();
        return  ok(toJson(books));
    }

    public static Result getRatings(){
        List<Book> books = new Model.Finder(String.class, Book.class).all();
        return  ok(toJson(books));
    }

}