# REST API Documentation 
short documentation that outlines the rest api implemented by the server which runs on express/node with mysql db. This documentation will outline urls that clients can access.  


## Posts
a post is a missed connection post. 


**URL** : /api/1.0/posts

**Method** : GET

**Parameters** : `?groupBy=campus`

## Success Responses

**Condition** : User can not see any Accounts.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : User can see one or more Accounts.

**Code** : `200 OK`

**Content** : In this example, the User can see three Accounts as AccountAdmin
`AA`, Viewer `VV`, and Owner `OO` - in that order:

```json
[
    {
        "account": {
            "id": 123,
            "name": "Lots of Admins Project",
            "enterprise": false,
            "url": "http://testserver/api/accounts/123/"
        },
        "permission": "AA"
    },
    {
        "account": {
            "id": 234,
            "name": "Feel free to View this",
            "enterprise": false,
            "url": "http://testserver/api/accounts/234/"
        },
        "permission": "VV"
    },
    {
        "account": {
            "id": 345,
            "name": "Mr Owner Project",
            "enterprise": false,
            "url": "http://testserver/api/accounts/345/"
        },
        "permission": "OO"
    }
]
```


