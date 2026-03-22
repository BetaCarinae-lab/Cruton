# WELCOME

This is the Cruton Syntax Guide, Part 2.  
At the time of writing, I am sitting on the last leg of  
an 8hr plane flight from DEN -> IAH -> LHR  

## Functions
Function syntax is as follows:
```
.[name]:
    ; Instructions
end
```

There is no return in cruton.
Instead you push values into globals or registers.
Так:
```cruton
.entry:
    mov r1, 7
    mov r2, 9

    call add ; oh, call is the way you, uh, call functions
    out r1 ; 7 + 9 = 16
end

; INPUTS
; R1, R2
; OUTPUTS TO R1
.add:
    add r1, r2
end
```

### Inlines
An inline function allows you to get a little, little more bang for your very, very expensive buck (talk'n 'bout RAM here, in the grand '26)
Basically, Instead of code like
```cruton
.entry:
    call sayHai
end

.sayHai:
    out "Hai!"
end
```
turning into something like
```js
function main() {
    sayHai()
}

function sayHai() {
    console.log("Hai!")
}
```

The contents of `sayHai` are deposited directly at the call site:
```cruton
.entry:
    call sayHai
end

inline .sayHai:
    out "Hai!"
end
```
is turned into:
```js
function main() {
    console.log("Hai!")
}

// used to be an inline func here"
```