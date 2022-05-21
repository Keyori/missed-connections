# HackRU-Spring22

## MySQL Database

### Logins
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

### Feed
| pid | uid | content | posted_at | location | longitude | latitude |
| --- | --- | --- | --- | --- | --- | --- |
| INT | INT | TEXT | TIMESTAMP | TEXT | FLOAT | FLOAT |
| d4e5f6 | 123 | sample | 1970-01-01 00:00:01 | New Brunswick, New Jersey | 0.00 | 0.00

### Comments
| pid | cid | uid | content  | posted_at |
| --- | --- | --- | ---- | --------- |
| INT | CHAR(6) | INT | TEXT | TIMESTAMP |
| 456 | a1b2c3 | 123 | sample | 1970-01-01 00:00:01 |

### Chat
| sender | recipient | content | sent_at |
| --- | --- | --- | --- |
| INT | INT | VARCHAR(250) | TIMESTAMP |
| 123 | 456 | sample | 1970-01-01 00:00:01 |