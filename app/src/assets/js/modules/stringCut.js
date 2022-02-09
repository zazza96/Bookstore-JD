export default (text)=> {
    var str = text;
    if(str.length > 140) str = str.substring(0,140);

    return str;
}