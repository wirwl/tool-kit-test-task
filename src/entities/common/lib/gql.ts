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

export const getRepo = gql`
query getRepo($name:String!, $owner:String!) { 
  repository(name:$name, owner:$owner) {
    name
    stargazerCount
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
  repositoryOwner(login: $owner) {
    avatarUrl    
    url
  }
}
`


export const getOwnRepos = gql`
query getOwnRepos {
  viewer {
    repositories(first: 100, affiliations:[OWNER, ORGANIZATION_MEMBER, COLLABORATOR], ownerAffiliations:[OWNER, ORGANIZATION_MEMBER, COLLABORATOR]) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes{
        id
        name
        stargazerCount
        pushedAt
        url
        isPrivate
        owner {
            login
            
          }
        }
      }
   }
 }
`