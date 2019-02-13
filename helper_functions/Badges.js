export function getDietBadge(diet) {

  switch(diet) {
    case 'Vegan': return require('../assets/badges/Vegan.png');
    case 'Vegetarian': return require('../assets/badges/Veggie.png');
    case 'vCurious': return require('../assets/badges/Vcurious.png');
    }
  }
