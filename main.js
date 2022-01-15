theta1 = 7 * Math.PI / 4
theta2 = 2 * Math.PI - Math.atan(2 / Math.sqrt(2))


// Correction values

x = Math.E ** ( (-1 * (720-570) ** 2) / (2 * (50**2)) )
y = Math.E ** ( (-1 * (720-540) ** 2) / (2 * (45**2)) )
z = Math.E ** ( (-1 * (720-444) ** 2) / (2 * (30.4**2)) )

l = x + y + z

x /= l
y /= l
z /= l


v = [
    x * Math.sin(theta1) + y * Math.cos(theta1),
    -1 * (x * Math.cos(theta2) * Math.cos(theta1) - y * Math.cos(theta2) * Math.sin(theta1) + z * Math.sin(theta2))
]


function setColor (wavelength) {
    x = Math.E ** ( (-1 * (wavelength-570) ** 2) / (2 * (50**2)) )
    y = Math.E ** ( (-1 * (wavelength-540) ** 2) / (2 * (45**2)) )
    z = Math.E ** ( (-1 * (wavelength-444) ** 2) / (2 * (30.4**2)) )

    l = x + y + z

    x /= l
    y /= l
    z /= l

    vector = [
        x * Math.sin(theta1) + y * Math.cos(theta1),
        -1 * (x * Math.cos(theta2) * Math.cos(theta1) - y * Math.cos(theta2) * Math.sin(theta1) + z * Math.sin(theta2))
    ]

    vector[0] -= v[0]
    vector[1] -= v[1]

    vector[0] -= Math.sqrt(6) * (0.349593495935 - 1/3 + 0.243902439024 / 2 - 1 / 6) / Math.sqrt(3)
    vector[1] -= Math.sqrt(6) * (0.243902439024- 1 / 3) / 2

    a = ( Math.sqrt(3) * vector[0] - vector[1] ) / Math.sqrt(6)
    b = ( 1 - (vector[1] + Math.sqrt(3) * vector[0] ) / Math.sqrt(6) )
    c = 2 * vector[1] / Math.sqrt(6)

    console.log(`a = ${a}     b = ${b}     c = ${c}`)

    max = Math.max(a, b, c)
    red = b / max
    green = a / max
    blue = c / max

    document.getElementsByTagName("body")[0].style.backgroundColor = `rgb(${255 * red}, ${255 * green}, ${255 * blue})`
}
