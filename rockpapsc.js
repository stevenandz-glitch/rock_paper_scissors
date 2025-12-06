function RandomNumber() {
  return Math.floor(Math.random() * 3);
}

function RandomMove(number) {
  switch (number) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
  }
}

function ValidMove(word) {
  switch(word) {
    case "Rock":
    case "Paper":
    case "Scissors":
      return true;
    default:
      return false;
  }
}

