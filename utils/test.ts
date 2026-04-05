
const userData = {
    invalidPassword: 'invalid_password',
    invalidUsername: 'invalid_user',
    books: {
        duplicate: '9781449325862',
        new: '9781449325862',
        ISBNs: [9781593275846, 9781593277574]
    }
}

function test() {
  const isbnList = userData.books.ISBNs
  console.log(isbnList)
  const bookList = isbnList.map((isbn) => {
    return {isbn: String(isbn)}
  })

  console.log(bookList)
}
test()
