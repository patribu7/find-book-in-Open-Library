import ndCover from "./image-component"
import { getValueType } from "./getValues";
import { researchType } from "./researchType";

// manipolazione degli oggetti ottenuti interrogando le API per poter ottenere i dati voluti: numero dei libri totali trovati, url della copertina, lista autori
export default function setProperty(library) {
    if (getValueType() === researchType.subject) {
        library.works.count = library.work_count;
        library.works.forEach(book => {
            if (book.cover_id != null) {
                book.imgUrl = process.env.URL_COVER + book.cover_id + '-' + process.env.IMG_SIZE + '.jpg';
            } else {
                book.imgUrl = ndCover.src;
            };

            book.authorsList = [];
            book.authors.forEach(author => book.authorsList.push(author.name));
        });
        return library.works

    } else {
        library.docs.count = library.numFound;
        library.docs.forEach(book => {
            if (book.cover_i != null) {

                book.imgUrl = process.env.URL_COVER + book.cover_i + '-' + process.env.IMG_SIZE + '.jpg';
            } else {
                book.imgUrl = ndCover.src;
            }

            book.authorsList = book.author_name;
        })
        return library.docs
    }
}