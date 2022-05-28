# Missed Connection App 




## MySQL Database

### Posts
| pid | uid | text | postedAt | location | geoLocation | campus |
| --- | --- | --- | --- | --- | --- | --- |
| CHAR(36) | CHAR(36) | TEXT | 	DATETIME | VARCHAR(255)	 | POINT | CHAR(20) |
| 56c73e78-6666-4923-a756-26614ef1f6f6 | df85ce3f-0dfa-4bcd-b365-1690fa67a67a | To the person I saw looking at my orgo test, you’re looking at the wrong persons test sorry bro wish i coulda helped | 1970-01-01 00:00:01 | College Ave Gym | ( 40.5027632, -74.4542884 ) | collegeAve

campus can be collegeAve | cookDoug | livingston | busch | NULL

<!-- ### Logins
| uid | username | hash | salt | session |
| --- | --- | --- | --- | --- |
| INT | VARCHAR(32) | VARCHAR(60) | VARCHAR(29) | CHAR(88) |
| 123 | john.doe | 1341h2u4n== | sdfsajfn | qwhjrejwq |

### Users
| uid | username | name | gender | grad_year |
| --- | --- | --- | --- | --- |
| INT | VARCHAR(32) | VARCHAR(32) | VARCHAR(16) | CHAR(4) |
| 123 | johndoe | John Doe | male | 2024 |

For gender, 0 will represent male, 1 will represent female, and 2 will represent other.

### Comments
| pid | cid | uid | content  | posted_at |
| --- | --- | --- | ---- | --------- |
| INT | CHAR(6) | INT | TEXT | TIMESTAMP |
| 456 | a1b2c3 | 123 | sample | 1970-01-01 00:00:01 |

### Chat
| sender | recipient | content | sent_at |
| --- | --- | --- | --- |
| INT | INT | VARCHAR(250) | TIMESTAMP |
| 123 | 456 | sample | 1970-01-01 00:00:01 | -->


## API 

### Posts

**route**: `GET /posts`

**description**: returns all posts. used to generate an infinte scrolling feed

**queries**: `?startPost={pid}` 
startPost is the pid of the current post for which the user wants to generate a collection of nearby posts. 

*pagination would make the app smoother, you can do that however you want like for example `?page={int}&numberOfPosts={int}`*

**return**: returns an array of posts objects.

-----

**route**: `GET /posts/map`

**description**: returns the geoloaction and campuse of all posts. used to generate the heatmaps. 

**queries**: none

**return**: returns an array of partial (only `geoloaction`, `campus`, and `pid`) posts objects grouped by the campus. ex:
```
[
"livingston":
  [
    {"longitude": 40.3467133, "latitude": -74.1148324", "pid":"56c73e78-6666-4923-a756-26614ef1f6f6"],
    {"longitude": 41.1517246, "latitude": -74.3242344", "pid":"73bb2c4a-911c-4a5c-aafd-bb69dfd976c9"],
    {"longitude": 40.6046241, "latitude": -73.9336884", "pid":"46899b9e-dd16-41ea-88df-dfbf2b2ca982"],
    ...
  ],
"collegeAve":
  [
    {"longitude": 40.5027632, "latitude": -74.4542884", "pid":"b36c6f37-0228-4063-8f2c-6327e2eb46ef"],
    ...
  ],
"cookDoug":
  [
    {"longitude": 40.5027632, "latitude": -74.4542884", "pid":"abdb496a-70dd-4a6d-a1a3-ada338dfe980"],
    ...
  ]
]
```
-----

**route**: `GET /posts/:pid`

**description**: returns a post given its pid.  

**queries**: none

**return**: returns full post object.

-----

**route**: `POST /posts`

**description**: creates a new post

**body**: {uid,  text, postedAt, location, geoLocation}

*notice that the user doesn't give campus*. asking the user for a lot of information is bad UX. No need to ask for something if we can calcute it ourselves. here the campus can be determined based the geolocation. It has been done in the old code https://github.com/Keyori/missed-connections/blob/fde295e2c1ce3453892b67d6e153a2fdfb929c6b/server/controllers/feed.js#L48
