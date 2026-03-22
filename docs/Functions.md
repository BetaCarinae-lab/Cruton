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
```
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
