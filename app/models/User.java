package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends Model {

    @Id
    public String email;
    public String name;
    public String password;

    @OneToMany(mappedBy="user")
    @JsonManagedReference
    public List<Comment> comments = new ArrayList<Comment>();

    public User(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public void addComment(Comment comment){
        comments.add(comment);
    }

    public static Finder<String,User> find = new Finder<String,User>(
            String.class, User.class
    );

    public static User authenticate(String email, String password) {
        return find.where().eq("email", email)
                .eq("password", password).findUnique();
    }

    public static User checkEmail(String email) {
        return find.where().eq("email", email).findUnique();
    }
}