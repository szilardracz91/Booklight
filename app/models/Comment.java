package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Comment extends Model {

    @Id
    public int id;

    @ManyToOne
    @JsonBackReference
    public User user;

    @ManyToOne
    @JsonBackReference
    public Book book;

    public String text;

    public Comment(User user, Book book, String text){
        this.user=user;
        this.book=book;
        this.text=text;
    }

    public static Finder<Integer,Comment> find = new Finder<Integer,Comment>(
            Integer.class, Comment.class
    );

}
