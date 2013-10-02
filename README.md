Objectify
=========

Given a JSON schema like this...  

```json
{
  "title": "Person Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["firstName", "lastName"]
}
```

Build an object like this... 

```js
var person = {
  firstName: "",
  lastName: "",
  age: 0
};
```
By calling...  

```js
var billy =  Objectify.create(schema, { firstName: "billy" });

billy = {
  firstName: "billy",
  lastName: "",
  age: 0
};
```

