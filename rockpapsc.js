const reset_button = document.querySelector("#reset");
const enter_button = document.querySelector("#enter");
const select_buttons = document.querySelector(".select__buttons");
const tie_alert = document.querySelector(".is__tie");

let user_input = document.querySelector("#user");
let computer_input = document.querySelector("#computer");
let score_input = document.querySelector("#score");

let user_points = 0;
let computer_points = 0;
let rounds = 0;
let game_ended = false;

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
  target_element.value = null;

  function TypeCharacter() {
    if (char_index < text.length) {
      new Audio("sounds/type_sound.mp3").play();
      target_element.value += text.charAt(char_index++);
      enter_button.disabled = true;
      reset_button.disabled = true;
      setTimeout(TypeCharacter, delay_ms);
    } else {
      enter_button.disabled = false;
      reset_button.disabled = false;
    }
  }

  TypeCharacter();
}

function TrimValue(element) {
  element.value = (
    element.value.charAt(0).toUpperCase() + element.value.slice(1)).trim();
}

function WriteFinal(message) {
  TypeWriter("score", "Game Ended", 75);
  tie_alert.textContent = message;
  tie_alert.style.animation = "pull_down 0.5s forwards";
  enter_button.disabled = true;
}

select_buttons.querySelectorAll("button").forEach((element)=>{
  element.addEventListener("click", ()=>{
    user_input.value = ' ';
    user_input.value += element.id;
  });
});

enter_button.addEventListener("click", ()=>{
  rounds++;
  TrimValue(user_input);

  if (!ValidMove(user_input.value)) {
    TypeWriter("score", "Invalid User Input", 75);
  } else {
    const computer_value = RandomMove(RandomNumber());
    const user_value = user_input.value;
    tie_alert.style.animation = "pull_up 0.5s ease-in-out forwards";

    if (((user_value === "Paper") && (computer_value === "Rock")) ||
        ((user_value === "Scissors") && (computer_value === "Paper")) || 
        ((user_value === "Rock") && (computer_value === "Scissors"))) {

      user_points++;
    } else if (user_value === computer_value) {
      tie_alert.style.display = "block";
      tie_alert.style.animation = "pull_down 0.5s ease-in-out forwards";
    } else {
      computer_points++;
    }

    score_input.value = `User: ${user_points} || Computer: ${computer_points} || ${rounds}`;
    TypeWriter("computer", computer_value, 75);

    if (rounds == 5) {
      game_ended = true;
      enter_button.style.display = "none";
    }
  }

  if (game_ended) {
    if (user_points > computer_points) {
      WriteFinal("Player Won");
    } else if (user_points < computer_points) {
      WriteFinal("Computer Won");
    } else {
      WriteFinal("No One Won");
    }
  }

});


reset_button.addEventListener("click", ()=>{
  enter_button.style.display = "block";
  game_ended = false;
  user_points = 0;
  computer_points = 0;
  rounds = 0;
  TypeWriter("score", "Game Is Reset");
  user_input.value = null;
  computer_input.value = null;
  tie_alert.style.display = "none";
  tie_alert.textContent = "TIED!";

});




