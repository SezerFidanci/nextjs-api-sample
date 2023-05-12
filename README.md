This is a Restful API sample with [Next.js](https://nextjs.org/)

## Getting Started

.env.example file rename as .env

Add DATABASE_URL = ""

Add ACCESS_TOKEN_SECRET="""

And run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with Postman like applicatio.

## Routes

#### Authorization

/api/auth/register [POST]

_Post Body_
```json
{
    "email": "test@test.com",
    "password": "123123",
    "name": "Sezer Fidancı",
    "city": "Ankara"
}
```

/api/auth/login [POST]

_Post Body_
```json
{
    "email": "test@test.com",
    "password": "123123"
}
```

/api/auth/refresh-token [POST]

_Without Post Body_



#### Users

/api/users/all [GET]

/api/users/{userid} [GET]
