package models;

import com.avaje.ebean.Model;
import com.avaje.ebean.Ebean;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Book extends Model {

    @Id
    public int id;
    public String title;
    public String author;
    public String description;

    @OneToMany
    @JsonManagedReference
    public List<Comment> comments = new ArrayList<Comment>();

    @ManyToMany (cascade = CascadeType.REMOVE)
    public List<Genre> genres = new ArrayList<Genre>();

    public Book(String title, String author, String description, Genre genre){
        this.title=title;
        this.author=author;
        this.description = description;
        this.genres.add(genre);
    }

    public static Finder<Integer,Book> find = new Finder<Integer,Book>(
            Integer.class, Book.class
    );

    public static Book create(String title, String author, String description, String genre) {

        Book book = new Book(title, author, description, Genre.find.ref(genre));
        book.save();
        Ebean.saveManyToManyAssociations(book, "genres");
        return book;
    }

    public static List<Book> findByGenre(String genre) {
        return find.where()
                .eq("genres.name", genre)
                .findList();
    }

    public static void addGenre(int bookId, String genre) {
        Book book = Book.find.setId(bookId).fetch("genres", "name").findUnique();

        book.genres.add(Genre.find.ref(genre));
        Ebean.saveManyToManyAssociations(book, "genres");
    }
}
