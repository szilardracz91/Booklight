package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.List;


@Entity
public class Rating extends Model {

    @Id
    public int id;

    @ManyToOne
    @JsonBackReference
    public Book book;
    @ManyToOne
    @JsonBackReference
    public User user;
    public double value;

    public Rating(Book book, User user, double value) {
        this.book = book;
        this.user = user;
        this.value = value;

    }

    public static Finder<Integer, Rating> find = new Finder<Integer, Rating>(
            Integer.class, Rating.class
    );

    public static Rating findByBookAndUser(Book book, User user) {
        return find.where().eq("book", book).eq("user", user).findUnique();
    }

}
