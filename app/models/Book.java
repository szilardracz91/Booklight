package models;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Book extends Model {

    @Id
    public Long id;
    public String title;
    public String author;
    public String description;


    public Book(String title, String author, String description){
        this.title=title;
        this.author=author;
        this.description = description;
    }

    public static Finder<String,Book> find = new Finder<String,Book>(
            String.class, Book.class
    );
}
