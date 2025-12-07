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

function TypeWriter(element_id, text, delay_ms = 100) {
  const target_element = document.querySelector('#' + element_id);
  let char_index = 0;

  function TypeCharacter() {
    if (char_index < text.length) {
      new Audio("sounds/type_sound.mp3").play();
      target_element.value += text.charAt(char_index++);
      setTimeout(TypeCharacter, delay_ms);
    }
  }

  TypeCharacter();
}

function WriteFinal(message) {
  score_input.value = ' ';
  TypeWriter("score", message, 100);
}

let user_points = 0;
let computer_points = 0;
let rounds = 0;
let game_ended = false;

let user_input = document.querySelector("#user");
let computer_input = document.querySelector("#computer");
let score_input = document.querySelector("#score");

const reset_button = document.querySelector("#reset");
const enter_button = document.querySelector("#enter");

const select_buttons = document.querySelector(".select__buttons");

select_buttons.querySelectorAll("button").forEach((element)=>{
  element.addEventListener("click", ()=>{
    user_input.value = ' ';
    user_input.value += element.textContent;
  });
});

enter_button.addEventListener("click", ()=>{
  rounds++;
  user_input.value = user_input.value.charAt(0).toUpperCase() + user_input.value.slice(1);
  user_input.value = user_input.value.trim();

  if (!ValidMove(user_input.value)) {
    score_input.value = ' ';
    TypeWriter("score", "Invalid User Input", 75);
  } else {
    const computer_value = RandomMove(RandomNumber());
    const user_value = user_input.value;

    if (((user_value === "Paper") && (computer_value === "Rock")) ||
        ((user_value === "Scissors") && (computer_value === "Paper")) || 
        ((user_value === "Rock") && (computer_value === "Scissors"))) {

      user_points++;
    } else if (user_value === computer_value) {

      alert("It is a tie");
    } else {

      computer_points++;
    }

    score_input.value = `User: ${user_points} || Computer: ${computer_points} || ${rounds}`;
    computer_input.value = ' ';
    TypeWriter("computer", computer_value, 75);

    if (rounds === 5) {
      enter_button.setAttribute("diabled", true); 
      game_ended = true;
    }
  }

  if (game_ended) {
    
    if (user_points > computer_points) {
      WriteFinal("The User Won");
    } else if (user_points < computer_points) {
      WriteFinal("The Computer Won");
    } else {
      WriteFinal("No One Won");
    }
  }
});

reset_button.addEventListener("click", ()=>{
  enter_button.removeAttribute("disabled");
  game_ended = false;
  user_points = 0;
  computer_points = 0;
  rounds = 0;
  score_input.value = ' ';
  TypeWriter("score", "Game Is Reset");
  user_input.value = ' ';
  computer_input.value = ' ';
});




