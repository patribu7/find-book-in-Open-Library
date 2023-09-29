import ndCover from "./image-component"
import { value_type } from "../config";
import researchType from '../researchType';

export default function setProperty(library) {
    if (value_type() === researchType.subject) {
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
            book.imgUrl = process.env.URL_COVER + book.cover_i + '-' + process.env.IMG_SIZE + '.jpg';
            book.authorsList = book.author_name;


        })
        return library.docs
    }
}