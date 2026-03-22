# THE BASICS OF CRUTON

Welcome, Again, I glad you've decided you want to  
learn this language!  

Lets start off with the basics, Create a file like `hello_world.crtn`
and write this:
```
.entry:
    ; comment
end
```
this is a basic program, `.entry` is a syntax that declares that this is the main function,  
Do you recognize the comment syntax?  
If you do, thats because it is NASM comments!  
This project takes a lot of inspiration from NASM and ASM in general  

### Hewwo worwld :3 pwogwam
Alright, How do we pump stuff to the `stdout`?
Well, we use `out [shorthand | string | register | number | anything thats shorthand]`

So replace `; comment` with `out "Hello, World!"`

It should look like:
```
.entry:
    out "Hello, World!"
end
```

then compile and run with `TODO: IMPLEMENT RUNNING SYSTEM`

### BLOOD, SWEAT, AND VARIABLES

Variables, the essence of a programming language, you can't have programming langauge without gam gam.

In Cruton, variables are declared like:
`ini [name]` or `ini [name], [initial value]` if you want a initial value

For example:

```
.entry:
    ini a
    ini b, 10

    out a   ; null
    out b   ; 10
end
```

To move a value to a variable, say we want to `a` to get out of its  
parent's basement and actually contribute to society, we use `mov`  
its syntax is `mov [name], [value: name | primitive]` where `[value: name | primitive]` is required, unlike `ini`

So:

```
.entry:
    ini a

    mov a, "Hello, World!" ; mov "Hello, World!" to a

    out a ; Hello, World!
end
```

#### STATIC

Static is a way to declare static variables, eg
```
.entry:
    static a, 10 ; Note: Static variables MUST be initilized
end
```

This directly translates to `const` in js

### THE BLUE STUFF
*Math isn't blue?*  
*Oh, you meant math!*  
*what did you think i meant?*  
*nothing, anyway*  

Math, Another important thing in programming.  
in Cruton it is similar-ish to math in NASM  
The syntax for math operations is simple:  
ADD: `add [name], [value: name | primitive]`  
MUL: `mul [name], [value: name | primitive]`  
SUB: `sub [name], [value: name | primitive]`  
DIV: `div [name], [value: name | primitive]`  

They all work the same just with different operations,  
When compiled, something like  
`add a, 10` is turned into `a += 10`  

There's also shorthand math, so instead of
```
.entry:
    ini a, 10
    add a, 10
    out a ; 20
end
```
you can write
```
.entry:
    ini a, 10
    out a + 10
end
```

### GLOBALS
*No fancy name, i had no idea what to do for this one*

Globals work like:
```
.data:
    ; global declarations go here
end
```



### CONGRATULATIONS
You know the basics of Cruton!