# Time To Travel

### API Documentation

## User

### - **(POST) Create User -**

<details>

-   _create a new user ._

```curl
 /user
```

#### Body example

```json
{
    "nome": "Beatriz",
    "email": "beatriz@gmail.com",
    "senha": "123456",
    "cpf": "11111111"
}
```

#### Sample Response

```json
{
    "id": 1,
    "name": "Beatriz",
    "email": "beatriz@gmail.com",
    "cpf": "11111111"
}
```

</details>

### - **(PUT) Update User -**

<details>

-   _update a user ._

```curl
 /user
```

### Header example

-   Authorization bearer {token}

#### Body example

```json
{
    "nome": "Beatriz",
    "email": "beatriz@gmail.com",
    "senha": "123456",
    "cpf": "11111111"
}
```

#### Sample Response

```json
{
    "message": "Updated"
}
```

</details>

### - **(DELETE) Delete User -**

<details>

-   _delete a user ._

```curl
 /user
```

### Header example

-   Authorization bearer {token}

#### Sample Response

```json
{
    "message": "Deleted"
}
```

</details>

### - **(GET) Get User -**

<details>

-   _get a user ._

```curl
 /user
```

### Header example

-   Authorization bearer {token}

#### Sample Response

```json
{
    "id": 1,
    "name": "Beatriz",
    "email": "beatriz@gmail.com",
    "cpf": "11111111"
}
```

</details>

### - **(GET) Get User Tickets -**

<details>

-   _get user's tickets._

```curl
 /user/tickets
```

### Header example

-   Authorization bearer {token}

#### Sample Response

```array
[
  {
    "id": 2,
    "destination": "S�o Paulo",
    "shipment": "Rio de Janeiro",
    "ship_date": "2020-12-15T03:00:00.000Z",
    "ship_time": "18:00:00",
    "estimated_time": "02:00:00",
    "limit": 46,
    "airline_id": 1,
    "status": "ativo",
    "image": null,
    "airline": "Travel Light",
    "airline_logo": "www.www",
    "amount_ticket": 2,
    "price_ticket": 50,
    "child_amount": 1,
    "total_paid": 70
  }
]
```

</details>

## Flight

### - **(POST) Create Flight -**

<details>

-   _create a new flight ._

```curl
 /flight
```

### Header example

-   Authorization bearer {token}

#### Body example

```json
{
    "destination": "Londres",
    "shipment": "Irlanda",
    "ship_date": "2020-12-15",
    "ship_time": "18:00",
    "estimated_time": "2:00",
    "limit": 50,
    "airline_id": 1,
    "status": "ativo"
}
```

#### Sample Response

```json
{
    "id": 3,
    "destination": "Londres",
    "shipment": "Irlanda",
    "ship_date": "2020-12-15",
    "ship_time": "18:00",
    "estimated_time": "2:00",
    "limit": 50,
    "airline_id": 1,
    "status": "ativo"
}
```

</details>

### - **(PUT) Update Flight -**

<details>

-   _update a flight ._

```curl
 /flight/{id}
```

### Header example

-   Authorization bearer {token}

### Parameters

-   ID: Integer

#### Body example

```json
{
    "destination": "Londres",
    "shipment": "Irlanda",
    "ship_date": "2020-12-15",
    "ship_time": "18:00",
    "estimated_time": "2:00",
    "limit": 50,
    "airline_id": 1,
    "status": "ativo"
}
```

#### Sample Response

```json
{
    "message": "Updated"
}
```

</details>

### - **(DELETE) Delete Flight -**

<details>

-   _delete a flight ._

```curl
 /flight/{id}
```

### Header example

-   Authorization bearer {token}

### Parameters

-   ID: Integer

#### Sample Response

```json
{
    "message": "Deleted"
}
```

</details>

### - **(GET) GET Flight -**

<details>

-   _get flights ._

```curl
 /flight?dest={dest}&ship={ship}
```

### Query string parameters

| Params | Type   | Format   | Example          | Required |
| ------ | ------ | -------- | ---------------- | -------- |
| ship   | string | `string` | "Rio de Janeiro" | false    |
| dest   | string | `string` | "S�o Paulos"     | false    |

#### Sample Response

```array
[
  {
    "id": 2,
    "destination": "S�o Paulo",
    "shipment": "Rio de Janeiro",
    "ship_date": "2020-12-15T03:00:00.000Z",
    "ship_time": "18:00:00",
    "estimated_time": "02:00:00",
    "limit": 46,
    "airline_id": 1,
    "status": "ativo",
    "image": "image.com"
  }
]
```

</details>

### - **(GET) GET Available Places to Flights -**

<details>

-   _get available flights ._

```curl
 /flight/available
```

#### Sample Response

```array
[
  "Rio de Janeiro",
  "Irlanda",
  "S�o Paulo",
  "Londres"
]
```

</details>

## Ticket

### - **(POST) Create Ticket -**

<details>

-   _create a new ticket ._

```curl
 /ticket
```

### Header example

-   Authorization bearer {token}

#### Body example

```json
{
    "flight_id": 3,
    "price_ticket": 70.0,
    "amount": 1,
    "child_amount": 0
}
```

#### Sample Response

```json
{
    "ticket_id": 6,
    "total": 70
}
```

</details>

### - **(PUT) Update Ticket -**

<details>

-   _cancel a ticket ._

```curl
 /ticket/cancel/{id}
```

### Header example

-   Authorization bearer {token}

### Parameter example

-   ID: Integer

#### Sample Response

```json
{
    "message": "Canceled"
}
```

</details>

### - **(POST) Create Airline -**

<details>

-   _create a new airline ._

```curl
 /airline
```

### Header example

-   Authorization bearer {token}

#### Body example

```json
{
    "name": "Travel Light",
    "logo": "www.www"
}
```

#### Sample Response

```json
{
    "id": 1,
    "name": "Travel Light",
    "logo": "www.www"
}
```

</details>

### - **(GET) GET Airline -**

<details>

-   _get all airlines ._

```curl
 /airlines
```

### Header example

-   Authorization bearer {token}

#### Sample Response

```array
[
  {
    "id": 1,
    "name": "Travel Light",
    "logo": "www.www"
  }
]
```

</details>

## Airline

### - **(GET) GET One Airline -**

<details>

-   _get a airline ._

```curl
 /airline/{id}
```

### Header example

-   Authorization bearer {token}

### Parameter example

-   ID: Integer

#### Sample Response

```json
{
    "id": 1,
    "name": "Travel Light",
    "logo": "www.www"
}
```

</details>

### - **(PUT) Update Airline -**

<details>

-   _update a airline ._

```curl
 /airline/{id}
```

### Header example

-   Authorization bearer {token}

#### Body example

```json
{
    "name": "Travel Light",
    "logo": "www.www"
}
```

#### Sample Response

```json
{
    "message": "Updated"
}
```

</details>
