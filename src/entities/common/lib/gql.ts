import { gql } from "@apollo/client";

export const getRepos = gql`
query getRepos($query: String!) { 
  search(
    type:REPOSITORY,
    query: $query,
    first: 100
  ) {
    repos: edges{
      repo:node{
        ... on Repository {
          id
          name
          owner {
            login
          }
          stargazerCount          
        #   updatedAt
          pushedAt
          url                    
        }
      }
    },
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage            
    }
  }
}
`

export const getRepo = (name:string, owner: string) => gql`
query getRepo { 
  repository(name:"${name}", owner:"${owner}") {
    name
    stargazerCount
    updatedAt
    pushedAt
    languages(first:5) {
      totalSize
      totalCount
      edges {        
        node {          
          id
          name
          color          
        },        
      }
      pageInfo {
        startCursor
      }
    } 
    shortDescriptionHTML
  }
  repositoryOwner(login: "${owner}") {
    avatarUrl    
    url
  }
}
`


