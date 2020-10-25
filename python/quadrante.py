x = float(input())
y = float(input())

if x == 0 and y == 0:
    print("origem")
elif x == 0:
    print("no eixo y")
elif y == 0:
    print("no eixo x")
elif x > 0 and y > 0:
    print("quadrante 1")
elif x and y < 0:
    print("quadrante 3")
elif x > 0 and y < 0:
    print("quadrante 4")
else:
    print("quadrante 2")
