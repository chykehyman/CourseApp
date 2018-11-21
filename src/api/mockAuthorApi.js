import delay from '../helpers/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authors = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  }
];

// This would be performed on the server in a real app. Just stubbing in.
const generateId = author => `${author.firstName.toLowerCase()}-${author.lastName.toLowerCase()}`;

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
  }

  static saveAuthor(author) {
    author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAuthorNameLength = 3;
        if (author.firstName.length < minAuthorNameLength) {
          reject(new Error(`First Name must be at least ${minAuthorNameLength} characters.`));
        }

        if (author.lastName.length < minAuthorNameLength) {
          reject(new Error(`Last Name must be at least ${minAuthorNameLength} characters.`));
        }

        if (author.id) {
          const existingAuthorIndex = authors.findIndex(a => a.id === author.id);
          authors.splice(existingAuthorIndex, 1, author);
        } else {
          // Just simulating creation here.
          // The server would generate ids for new authors in a real app.
          // Cloning so copy returned is passed by value rather than by reference.
          author.id = generateId(author);
          authors.push(author);
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId, courses) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (courses.findIndex(course => course.authorId === authorId) >= 0) {
          reject(new Error('Forbidden: Author already has a course'));
        }
        const indexOfAuthorToDelete = authors.findIndex(author => author.id === authorId);
        authors.splice(indexOfAuthorToDelete, 1);
        resolve();
      }, delay);
    });
  }

  static getSingleAuthor(authorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = authors.findIndex(author => author.id === authorId);
        resolve(authors[indexOfCourseToDelete]);
      }, delay);
    });
  }
}

export default AuthorApi;
