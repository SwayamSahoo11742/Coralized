
export function colorInterpolate(min,max,value,mincolor,maxcolor){
    //get rgb for min
    var minRed = mincolor[0];
    var minBlue = mincolor[2];
    var minGreen = mincolor[1];
    //get rgb for max
    var maxRed = maxcolor[0];
    var maxBlue = maxcolor[2];
    var maxGreen = maxcolor[1];
    //determine offsets based on val,min,max and the color difference
    var redOffset = (maxRed-minRed)*((value-min)/(max-min));
    var greenOffset = (maxGreen-minGreen)*((value-min)/(max-min));
    var blueOffset = (maxBlue-minBlue)*((value-min)/(max-min));

    return [minRed+redOffset,minGreen+greenOffset,minBlue+blueOffset];
}
