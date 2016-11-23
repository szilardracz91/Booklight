package controllers;

import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.Model;
import com.fasterxml.jackson.databind.JsonNode;

import models.Book;
import models.Comment;
import models.Rating;
import models.User;

import models.*;


import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;
import views.html.login;
import views.html.registrate;

import java.util.ArrayList;
import java.util.List;

import static com.avaje.ebean.Expr.eq;
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

    public static Result registration() {
        Form<Registrate> regForm = Form.form(Registrate.class).bindFromRequest();
        if (regForm.hasErrors()) {
            return badRequest(registrate.render(regForm));
        } else {
            session().clear();
            session("email", regForm.get().email);
            return redirect(
                    routes.Application.index()
            );
        }


    }

    public static Result addNewUser() {
        new User("leskoBandi@gmail.com", "Bob", "secret").save();
        return ok("csa");
    }

    public static Result getBook(int bookId) {
        if (bookId == 0) {
            return badRequest("Wrong video ID");
        }
        //System.out.println(bookId);
        Book book = Book.find.byId(bookId);

        return  ok(toJson(book));
    }

    public static Result getCommentUsers(int bookId) {
        if (bookId == 0) {
            return badRequest("Wrong video ID");
        }
        Book book = Book.find.byId(bookId);
        List<Comment> comments = Comment.find.where().eq("book", book).findList();
        List<String> userek = new ArrayList<String>();
        for(Comment comment: comments){
            userek.add(comment.user.email);
        }

        return  ok(toJson(userek));
    }

    public static Result addInitData() {

        new Genre("fantasy").save();
        new Genre("classic").save();
        new Genre("history").save();
        new Genre("juvenile").save();
        new Genre("tragedy").save();
        new Genre("epic").save();

        User userOne = new User("asd@asd.com", "Alice", "secret");
        userOne.save();

        User userTwo = new User("asasdd@asd.com", "Bob", "secret");
        userTwo.save();

        User userThee = new User("asasjjbgdd@asd.com", "Lenin", "secret");
        userThee.save();


        Book tr = Book.create("Trónok harca","George R. R. Martin","Epikus fantasy, nem középszerű","fantasy");
        tr.save();
        tr.addGenre(tr.id, "epic");

        Book hp = Book.create("Harry Potter és Tűz serlege", "J. K. Rowlings","Varázslatos árvíztűrőtükörfúrógép", "juvenile");
        hp.save();
        hp.addGenre(hp.id, "fantasy");
        hp.addGenre(hp.id, "epic");

        Book lrt = Book.create("Logikai rendszerek tervezése", "Arató Péter","Az ifjúsági irodalom legjava", "classic");
        lrt.save();
        lrt.addGenre(lrt.id, "juvenile");


        BookList list1 = BookList.create(tr, userOne);
        list1.status = "published";
        list1.save();
        list1.addBook(list1.id, hp.id);
        list1.addBook(list1.id, lrt.id);


        BookList list2 = BookList.create(hp, userTwo);
        list2.addBook(list2.id, tr.id);

        return ok("Some init data were added");
    }

    public static Result writeComment() {

        User user = User.find.byId(session().get("email"));
        Book book = Book.find.byId(1);
        Comment com = new Comment(user, book, "this is a shit again");
        com.save();
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

    public static Result registrate() {
        return ok(
                registrate.render(Form.form(Registrate.class))
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

    public static class Registrate {

        public String email;
        public String name;
        public String password;

        public String validate() {
            if (User.checkEmail(email) == null) {
                new User(email, name, password).save();
            }
            else return "This email already exists";
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

    public static Result getRatings(int bookId){
        if (bookId == 0) {
            return badRequest("Wrong video ID");
        }
        //System.out.println(bookId);
        Book book = Book.find.byId(bookId);
        List<Rating> ratings = Rating.find.where().eq("book", book).findList();

        double sum = 0;
        int itemCount = ratings.size();
        for(Rating rating : ratings) {
            sum+=rating.value;
        }
        sum = sum/itemCount;
        return  ok(toJson(sum));
    }

    public static Result postComment(){
        JsonNode json = request().body().asJson();
        String comment = json.findPath("comment").asText();
        int bookId = json.findPath("bookId").intValue();
        Book book = Book.find.byId(bookId);
        User user = User.find.byId(session().get("email"));
        new Comment(user, book, comment).save();



        return  ok();
    }

    public static Result postRating(){
        JsonNode json = request().body().asJson();
        int bookId = json.findPath("bookId").intValue();
        double ratingValue = json.findPath("ratingValue").doubleValue();
        Book ratedBook = Book.find.byId(bookId);
        User user = User.find.byId(session().get("email"));
        Rating rating = Rating.findByBookAndUser(ratedBook, user);
        if (rating != null){
            rating.value = ratingValue;
            rating.save();
        }
        else {
            new Rating(ratedBook, user, ratingValue).save();
        }
        return  ok();
    }

    public static Result getGenres(){
        List<Genre> genres = new Model.Finder(String.class, Genre.class).all();
        return  ok(toJson(genres));
    }

    public static Result getBookByGenres(String genreName){
        List<Book> booksByGenre = Book.findByGenre(genreName);
        return  ok(toJson(booksByGenre));
    }

    public static Result getPublishedBookLists(){
        List<BookList> bookLists = BookList.findByStatus("published");
        return  ok(toJson(bookLists));
    }

    public static Result getBooklistOfUser(){
        User user = User.find.byId(session().get("email"));
        List<BookList> bookLists = BookList.findByUser(user);
        return  ok(toJson(bookLists));
    }

}