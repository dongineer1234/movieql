####################################################################################################

#1 Hello and Introduction

# npm에서 yarn install
: npm install -g yarn

# graphql-yoga
: Backend 개발을 쉽게 만들어 줌

# graphql-yoga install
: yarn add graphql-yoga

####################################################################################################

#2 Problems solved by GraphQL

# GraphQL로 해결할 수 있는 Over-fetching
: Over-fetching이란 내가 요청한 정보보다 많은 정보를 서버에서 받는것임 GraphQL로 Frontend가 필요한 정보만 Database에 요청해서 해결

# GraphQL로 해결할 수 있는 Under-fetching
: REST에서 하나르 완성하려고 많은 소스를 요청하는것

# GraphQL
: 한 query에 우리가 정확하게 원하는 정보만 받을 수 있음

# query
: Database에 필요한 것을 요청하는 것

# mechanism
: GraphQL에 query하여 JavaScript Object로 요청한 정보를 전달 받음 API로 조정하거나 여러가질 섞어서 모양을 바꾸거나 응용할 수 있음

####################################################################################################

#3 Creating a GraphQL Server with GraphQL Yoga

# nodemon
: 즉각즉각 저장된 내용 적용

# nodemon install
: yarn global add nodemon
package.json에 "scritps":"nodemon" 추가

# babel-cli install
: yarn global add babel-cli
yarn global add babel-cli --ignore-engines
package.json에 "scripts": {"start": "nodemon --exec babel-node index.js"} 추가

# .babelrc
: {"presets": ["env","stage-3"]} 추가 후 
yarn add babel-preset-env babel-preset-stage-3 --dev
yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev

# Schema
: 사용자에게 보내거나 사용자로부터 받을 data에 대한 설명

####################################################################################################

#4 Creating the first Query and Resolver

# No schema defined
: 무엇을 전달해 줄것인가에 대한 설명이 없음

# query
: Database에 필요한 것을 요청하는 것, data를 받을 때 쓰임

# Mutation
: data를 변형할 때 
서버에서, Database에서, 메모리에서 정보를 바꾸는 작업을 할 때

# GraphQL Server에서 수행할 작업
: 어떤 Mutations 그리고 어떤 Query들을 우리가 가졌는지 알려주는것

# GraphQL
: 알아서 package에서 install

# typeDefs
: 모든 type들에 대한 정의

# schema.graphql의 type Query {name: String!}
: Query에 name을 보내면 String을 보낸다는 설명

# resolvers.js const resolves = {Query: {name: () => "dongenius"}}
: Query를 resolve
예를 들어 어떤 사용자가 name Query를 보내면
"dongenius"로 반환하는 함수로 답
정리하면 Query를 설명, Resolvers를 Programming

# GraphQL Playground
: http://localhost:4000/
graphql-yoga에 따라오는 tool
Database를 테스트하게 해주는 기능

####################################################################################################

#5 Extending the Schema

# Schema info
: GraphQL Playground에서 확인할 수 있는 Schema info
API를 잊어버렸을 때도 확인가능

####################################################################################################

#6 Extending the Schema part Two

# resolvers.js에서 id부여
: 
const people = [
    "1" = {
        name: "dongenius1",
        age: 28,
        gender: "male"
    },
    "2" = {
        name: "dongenius2",
        age: 29,
        gender: "female"
    },
    "3" = {
        name: "dongenius3",
        age: 30,
        gender: "transgender"
    }
]

# db.js
: 만들어서 따로 관리하면 관리가 편함

# filter
: 모든 대상을 거친 뒤 해당 조건에 맞는 걸 return
const getById = id => {
    const filteredPeople = people.filter(person => people.id === id)
    return filteredPeople.filter[0]
}

####################################################################################################

#7 Creating Queries with Arguments

# 이용자가 우리에게 준 ID를 어떻게 받는가?
: GraphQL Resolvers는 GraphQL Server에서 요청을 받음
GraphQL Server가 Query나 Mutation의 정의를 발견하면 Resolver를 찾을 것이고 
해당 function을 실행 그 과정에서 argument를 사용하기도 함

# Schema
: 사용자에게 보내거나 사용자로부터 받을 data에 대한 설명

: URLs같은 개념 어디로 갈 지 정해주니까

####################################################################################################

#8 Defining Mutations

# Mutation
: Database의 상태가 변할 때 사용

####################################################################################################

#9 Creating first Mutation

# Mutation
: Database의 상태가 변할 때 사용

:
(revolvers.js)
const resolves = {
    Query: {
        movies: () => getMovies(),
        movie: (_, { id }) => getById(id)
    },
    Mutation: {
        addMovie: (_, { name, score }) => addMovie(name, score)
    }
}

->

(schema.graphql)
type Mutation {
  addMovie(name: String!, score: Int!): Movie!
}

->

(db.js)
export const addMovie = (name, score) => {
    const newMovie = {
        id: `${movies.length + 1}`,
        name,
        score
    }
    movies.push(newMovie)
    console.log(movies)
    return newMovie
}

(http://localhost:4000/ - movies)
query {
  movies {
    name
    score
  }
}

(http://localhost:4000/ - addMovie)
mutation {
  addMovie(name: "RockandRolla", score: 9) {
    id
    name
  }
}

####################################################################################################

#10 Delete Mutation

# Delete Mutation
: deleteMovie는 true나 false만을 return


(revolvers.js)
const resolves = {
    Query: {
        movies: () => getMovies(),
        movie: (_, { id }) => getById(id)
    },
    Mutation: {
        addMovie: (_, { name, score }) => addMovie(name, score),
        deleteMovie: (_, { id }) => deleteMovie(id)
    }
}

->

(schema.graphql)
type Mutation {
  addMovie(name: String!, score: Int!): Movie!
  deleteMovie(id: Int!): Boolean!
}

->

(db.js)
export const deleteMovie = id => {
    const cleanedMovies = movies.filter(movie => movie.id !== id)
    if (movies.length > cleanedMovies.length) {
        movies = cleanedMovies
        return true
    } else {
        return false
    }
}

# API
: 사용할 수 있는 Backend중 하나 GraphQL을 적용할 수 있음
내 client는 나와 GraphQL언어로 대화하고 이 GraphQL server를 가져다가
다른 API와 대화할 수 있음 GraphQL Server를 통한 REST API를 이용하여
사용자는 Playground console(http://localhost:4000/)과 상호작용

####################################################################################################

#11 Wrapping a REST API with GraphQL Part One

# API를 받고 db.js로 옮김
: https://yts.lt/api/v2/list_movies.json?limit=50&minimum_rating=9

# node-fetch install
: yarn add node-fetch
import fetch from "node-fetch"

####################################################################################################

#12 Wrapping a REST API with GraphQL Part Two

# resolove.js
:
import { getMovies } from './db.js'

const resolves = {
    Query: {
        movies: (_, { rating, limit }) => getMovies(limit, rating)
    }
}

export default resolves

# schema.graphql
:
type Movie {
  id: Int!
  title: String!
  rating: Float!
  summary: String!
  language: String!
  medium_cover_image: String!
}

type Query {
  movies(limit: Int, rating: Float): [Movie]!
}

# db.js
:
import fetch from "node-fetch"

const API_URL = "https://yts.lt/api/v2/list_movies.json?"

export const getMovies = (limit, rating) => {
    let REQUEST_URL = API_URL
    if (limit > 0) {
        REQUEST_URL += `limit=${limit}`
    }

    if (rating > 0) {
        REQUEST_URL += `&minimum_rating=${rating}`
    }
    return fetch(REQUEST_URL)
        .then(res => res.json())
        .then(json => json.data.movies)
}

####################################################################################################
