package models;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Vori on 2016.11.23..
 */

@Entity
public class Genre extends Model {

    @Id
    public String name;

    public Genre(String name) {

        this.name=name;
    }

    public static Finder<String, Genre> find = new Finder<String,Genre>(
            String.class, Genre.class
    );
}
