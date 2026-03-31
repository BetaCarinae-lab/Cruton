# DATA TYPES

Data types in cruton work the exact same as JavaScript.

Objects look like:
```
.entry:
    ini objectExample, {
        a: 10
        b: ":3"
        c: {
            ca: "nested object"
        }
    }

    ; And they are accessed like
    out objectExample.a ; 10
end
```

We also have arrays:

```
.entry:
    ini arrayExample, [10, ":3", ["Nested Array"]]
    
    ; and they are accessed like:
    out arrayExample[1] ; :3

    ; Matrices can be accessed like:
    out arrayExample[2][0] ; "Nested Array"
end
```