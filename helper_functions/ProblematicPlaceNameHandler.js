export function problematicPlaceNameHandler(location){

  if (location === "Bath" || location === "bath"){
    return "Bath Somerset"
  }

  if (location === "Wick" || location === "wick"){
    return "Wick caithness herring"
  }

  if (location === "Saint Andrews" || location === "saint andrews" || location === "saint Andrews" || location === "Saint andrews"){
    return "St Andrews"
  }

  if (location === "newcastle county down" || location === "newcastle down" || location === "newcastle northern ireland" || location === "newcastle in ireland"){
    return "Newcastle ireland"
  }

  if (location === "stonehenge" || location === "Stonehenge" || location === "stone henge"){
    return "Stonehenge Wiltshire"
  }

  if (location === "cowes" || location === "Cowes"){
    return "cowes wight"
  }

  if (location === "balmoral" || location === "Balmoral"){
    return "Balmoral castle"
  }

  if (location === "stoke" || location === "Stoke"){
    return "stoke on trent"
  }

  else {
    return location
  }

}
