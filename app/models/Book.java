package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Book extends Model {

    @Id
    public int id;
    public String title;
    public String author;
    public String description;
    public String genre;

    @OneToMany(mappedBy="book")
    @JsonManagedReference
    public List<Comment> comments = new ArrayList<Comment>();


    public Book(String title, String author, String description, String genre){
        this.title=title;
        this.author=author;
        this.description = description;
        this.genre = genre;
    }


    public static Finder<Integer,Book> find = new Finder<Integer,Book>(
            Integer.class, Book.class
    );

    public static List<Book> filteWithGenre(String genre) {
        return find.where().eq("email", genre).findList();
    }
}
