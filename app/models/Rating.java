package models;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Rating extends Model {

    @Id
    public int id;

    @ManyToOne
    public Book book;
    @ManyToOne
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

}
