export function currentTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  return {hours: hours, minutes: minutes}
}

export function getTimeBasedGreeting(user){
  var timeNow = currentTime();

  if (timeNow.hours > 22 || timeNow.hours < 5){
    return `Hello ${user}. You're up late, can't sleep?`
  }
  else if (timeNow.hours > 4 && timeNow.hours < 8){
    return `Good morning ${user} You're up bright & early today!`
  }
  else if (timeNow.hours > 7 && timeNow.hours < 12){
    return `Good morning ${user}! Lets explore NüV!`
  }
  else if (timeNow.hours > 11 && timeNow.hours < 18){
    return `Good afternoon ${user}! What are you looking for?`
  }
  else if (timeNow.hours > 17 && timeNow.hours < 23){
    return `Good evening ${user}! Enjoy browsing NüV 😃`
  }
}
