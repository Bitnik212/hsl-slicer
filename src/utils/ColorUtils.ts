import {HSLColor} from "react-color";

export default class ColorUtils {

    decomposeColor(color: HSLColor): HSLColor[] {
        const decomposedColors: HSLColor[] = []
        for (let i: number = 1000; i >= 0; i-=50) {
            decomposedColors.push({h: color.h, s: color.s, l: i/1000});
        }
        return decomposedColors
    }

}

