package models;

import com.avaje.ebean.Model;
import com.avaje.ebean.Ebean;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class BookList extends Model {

    @Id
    public int id;

    public String status;
    @ManyToMany (cascade = CascadeType.REMOVE)
    public List<Book> books = new ArrayList<Book>();

    @ManyToOne
    public User user;

    public BookList(Book book, User user){
        this.user = user;
        this.status = "private";
        this.books.add(book);
    }

    public static Finder<Integer,BookList> find = new Finder<Integer,BookList>(
            Integer.class, BookList.class
    );
    public static BookList create(Book book, User user) {
        BookList bookList = new BookList(book, user);
        bookList.save();
        Ebean.saveManyToManyAssociations(bookList, "books");
        return bookList;
    }

    public static void addBook(int booklistId, int bookId) {
        BookList bookList = BookList.find.setId(booklistId).fetch("books", "id").findUnique();
        bookList.books.add(Book.find.ref(bookId));
        Ebean.saveManyToManyAssociations(bookList, "books");
    }

    public static List<BookList> findByStatus(String status) {
        return find.where()
                .eq("status", status)
                .findList();
    }

    public static List<BookList> findByUser(User user) {
        return find.where()
                .eq("user", user)
                .findList();
    }

}
