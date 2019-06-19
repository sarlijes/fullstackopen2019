let _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const count = (blogs) => {
    return blogs.length
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const blogWithMostVotes = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return blogWithMostVotes
}

const authorWithMostPosts = (blogs) => {

    const reducer = (sum, item) => { return sum + item }

    const authors = _.groupBy(blogs, 'author')
    console.log(authors.length)
    // authors.forEach (el =>
    //     console.log(el))
    _.forEach(authors, function(el) {
        // console.log(el.length);
        // console.log(el.author);
      });
    return authors

}
module.exports = {
    dummy, count, totalLikes, favouriteBlog, authorWithMostPosts
}

/*
    // console.log('---- ', _.groupBy(authors.forEach))
    // console.log(authors.forEach(el =>
    //     console.log(el)))
    _.forEach(authors, function (el) {
        console.log(authors)
        _.reduce(authors, function (sum, n) {
            console.log("el nyt ---- ", el)
            // return sum + el.length
            // }, 0)
            // )
        })

    }
//    return authors
}
*/