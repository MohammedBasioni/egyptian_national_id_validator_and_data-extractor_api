# Egyptian national ID validator and data-extractor API

## Description
```
GET /info/:national_id
```
Returns the data represents the citizen whose egyptian national ID is `national_id` if it is a valid one.

### Example Request
```
GET /info/30007012404572
```
### Example Response
```
{
    "message": {
        "birthDate": "July 1, 2000",
        "governorate": "Minya",
        "birthOrder": 457
    }
}
```

## How to run
1. In the terminal, run `npm install`.
2. run `npm run dev`. You should see the server running:
    ```
    The server is running on port 3000
    ```
3. Make your request on `localhost:3000`.