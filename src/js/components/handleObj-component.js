import ndCover from "./image-component"
import {getValueType } from "../config";
import * as cf from '../config';

export default function setProperty(library) {
    if (getValueType() === cf.researchType.subject) {
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