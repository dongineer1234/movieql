import { getMovies } from './db.js'

const resolves = {
    Query: {
        movies: (_, { rating, limit }) => getMovies(limit, rating)
    }
}

export default resolves