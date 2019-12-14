const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');

let books=[];
try{
    const readBookJson = fs.readFileSync('./../books.json', 'utf-8');
    books=JSON.parse(readBookJson);
}
catch(e)
{
    console.log("no books already staring new data store");
}

router.get('/', (req, res) => {
    res.render('index.ejs', { books });
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
})

router.post('/new-entry', (req, res) => {
    //console.log(req.body); //from the form entry
    const {title, author ,image, description } = req.body;
    if(!title || !author || !image || !description)
    {
        res.status(404).send('Entries incomlplete');
        return;
    }
    let newBook = {
        id: uuid(),
        title,
        author,
        image,
        description
    }
    books.push(newBook);

    const json_books = JSON.stringify(books);
    fs.writeFileSync('./../books.json', json_books, 'utf-8');

    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    books = books.filter(book => { book.id !== req.param.id})
    const json_books = JSON.stringify(books);
    fs.writeFileSync('./../books.json', json_books, 'utf-8');
    res.redirect('/');
})

module.exports = router;
