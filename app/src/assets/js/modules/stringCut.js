export default (text) => {
    //pass through the text
    var str = text;
    //if the text is more than 140 characters, only get the first 140 characters
    if (str.length > 140) str = str.substring(0, 140);

    //return string
    return str;
}