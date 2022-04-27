function DateValue(props){
    let d=new Date();
    let month=d.getMonth();
    let dayOfMonth=d.getDate();
    let dayOfWeek=d.getDay();
    let theYear=d.getFullYear();

    let monthText="";
    let dayText="";



let monthObj={
    "1":"January", "2":"March"
}
    
//Below is the logic control to display the day.

switch(dayOfWeek){
    case 0:
        dayText="Sunday";        
    break;
    
    case 1:
        dayText="Monday";
    break;

    case 2:
        dayText="Tuesday";
    break;   

    case 3:
        dayText="Wednesday";
    break;   
    
    case 4:
        dayText="Thursday";
    break;   

    case 5:
        dayText="Friday";
    break;   

    case 6:
        dayText="Saturday";
    break;    

}


    //Below is the logic control to display the month.
    switch(month) {

    case 0:
        monthText = 'January';
    break;

    case 1:
        monthText = 'February';
    break;

    case 2:
        monthText = 'March';
    break;

    case 3:
        monthText = 'April';
    break;

    case 4:
        monthText = 'May';
    break;

    case 5:
        monthText = 'June';
    break;

    case 6:
        monthText = 'July';
    break;

    case 7:
        monthText = 'August';
    break;

    case 8:
        monthText = 'September';
    break;

    case 9:
        monthText = 'October';
    break;

    case 10:
        monthText = 'November';
    break;

    case 11:
        monthText = 'December';
    break;


    }


    return(
        <div>

        
        <h3>{dayText+", "+monthText+", "+dayOfMonth+" "+theYear}</h3>

         </div>
        );
}

export default DateValue;