# Egyptian national ID validator and data-extractor API

## Description
```
GET /:national_id
```
Returns the data represents the citizen whose egyptian national ID is `national_id` if it is a valid one.

### Example request for a valid national ID
```
GET /30007012404572
```
### Example Response
```json
{
  "message": {
    "gender": "Male",
    "birth_date": "July 1, 2000",
    "governorate": "Minya",
    "birth_order": 45
  }
}
```

### Example request for an invalid national ID
```
GET /30015143
```
### Example Response
```json
{
  "message": "Invalid national number."
}
```
## How to run

```bash
> git clone git@github.com:MohammedBasioni/egyptian_national_id_validator_and_data-extractor_api.git
> cd .\egyptian_national_id_validator_and_data-extractor_api\
> npm install
> npm run dev
  The server is running on port 3000
> curl http://localhost:3000/{your_national_id}
```