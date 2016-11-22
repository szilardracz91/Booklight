package models;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Rating extends Model {

    @Id
    public Long id;

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

    public static Finder<String, Rating> find = new Finder<String, Rating>(
            String.class, Rating.class
    );

}
