import json
import math
import colorsys


def step (r,g,b, repetitions=1):
 lum = math.sqrt( .241 * r + .691 * g + .068 * b )

 h, s, v = colorsys.rgb_to_hsv(r,g,b)

 h2 = int(h * repetitions)
 lum2 = int(lum * repetitions)
 v2 = int(v * repetitions)

 return (h2, lum, v2)


def stepCont (r,g,b, repetitions=1):
    lum = math.sqrt( .241 * r + .691 * g + .068 * b )

    h, s, v = colorsys.rgb_to_hsv(r,g,b)
    h2 = int(h * repetitions)
    lum2 = int(lum * repetitions)
    v2 = int(v * repetitions)

    if h2 % 2 == 1:
        v2 = repetitions - v2
        lum = repetitions - lum

    return (h2, lum, v2)


with open('AllHSBColors.json') as json_file:
    data = json.load(json_file)
    # data = data['responses'];
    data['responses'].sort(key=lambda j: step(j['rgbColor']['r'],j['rgbColor']['g'],j['rgbColor']['b'],8) )
    print(data);

    with open('AllHSBColors3.json', 'w') as outfile:
        json.dump(data, outfile)
