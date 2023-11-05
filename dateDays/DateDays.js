const dateToDays=(dateString)=> {
    var referenceDate = new Date();
    var inputDate = new Date(dateString);
    var timeDiff = inputDate.getTime() - referenceDate.getTime();
    var days = Math.floor(timeDiff / (1000 * 3600 * 24));
    console.log(days);
    return days;
}


module.exports = {dateToDays}
