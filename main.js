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

    document.getElementById("lumen-response").style.backgroundColor = `rgb(${255 * red}, ${255 * green}, ${255 * blue})`
    document.getElementById("algo-response").style.backgroundColor = algorgb(wavelength)
}


// ALGORITHMIC VERSION

function algorgb(wavelength){
    var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
    if((wavelength >= 380) && (wavelength<440)){
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    }else if((wavelength >= 440) && (wavelength<490)){
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    }else if((wavelength >= 490) && (wavelength<510)){
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    }else if((wavelength >= 510) && (wavelength<580)){
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    }else if((wavelength >= 580) && (wavelength<645)){
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    }else if((wavelength >= 645) && (wavelength<781)){
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }else{
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };
    // Let the intensity fall off near the vision limits
    if((wavelength >= 380) && (wavelength<420)){
        factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
    }else if((wavelength >= 420) && (wavelength<701)){
        factor = 1.0;
    }else if((wavelength >= 701) && (wavelength<781)){
        factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };
    if (red !== 0){
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0){
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0){
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
    return `rgb(${red}, ${green}, ${blue})`;
}

