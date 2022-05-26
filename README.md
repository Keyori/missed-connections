# Missed Connection App 




## MySQL Database

### Posts
| pid | uid | text | postedAt | location | geoLocation | campus |
| --- | --- | --- | --- | --- | --- | --- |
| CHAR(36) | CHAR(36) | TINYTEXT | 	DATETIME | VARCHAR(255)	 | POINT | CHAR(20) |
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

**return**: returns an array of partial (only `geoloaction`, and `campus`) posts objects grouped by the campus. ex:
```
[
"livingston":
  [
    ["40.5027632,-74.4542884"],
    ["40.4998391,-74.4519992"],
    ["40.4978166,-74.4496677"],
    ...
  ],
"collegeAve":
  [
    ["40.5027632,-74.4542884"],
    ...
  ],
"cookDoug":
  [
    ["40.5027632,-74.4542884"],
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
