enum GameState {
    Passive,   //Výchozí stav. Čeká se na spuštění nového kola.
    Started,   //Přesýpací hodiny – náhodné čekání před signálem.
    Running    //Signál zobrazen – hráči reagují stiskem tlačítka.
}

let state: GameState = GameState.Passive

function diskvalifikace()
{
    state = GameState.Passive;
}

input.onButtonPressed(Button.AB, function () {

state = GameState.Started;
hodiny();
control.runInBackground(() => music.playTone(440, 200));

const waitTime = randint(3, 6);


basic.pause(waitTime * 1000);

let pressedA = input.buttonIsPressed(Button.A);
let pressedB = input.buttonIsPressed(Button.B);

    if (pressedA && pressedB) {
        basic.showIcon(IconNames.Sad);
        control.runInBackground(() => music.playTone(220, 200));
        basic.pause(1000);
        diskvalifikace();
    }
    else if (pressedA) {
        basic.showString("B");
        control.runInBackground(() => music.playTone(380, 200));
        basic.pause(1000);
        diskvalifikace();
    }
    else if (pressedB) {
        basic.showString("A");
        control.runInBackground(() => music.playTone(380, 200));
        basic.pause(1000);
        diskvalifikace();
    }
    else 
    {
        basic.pause(1000);
        state = GameState.Running;
    }
})


basic.forever(function () {
if (state == GameState.Running)
{
    basic.showIcon(IconNames.Pitchfork);
    control.runInBackground(() => music.playTone(300, 200));

    let pressedA = input.buttonIsPressed(Button.A);
    let pressedB = input.buttonIsPressed(Button.B);

    if (pressedA && pressedB) {
        basic.showIcon(IconNames.Square);
        control.runInBackground(() => music.playTone(400, 200));
        state = GameState.Passive;
    }
    else if (pressedA) {
        basic.showString("A");
        control.runInBackground(() => music.playTone(380, 200));
        state = GameState.Passive;
    }
    else if (pressedB) {
        basic.showString("B");
        control.runInBackground(() => music.playTone(380, 200));
        state = GameState.Passive;
    }
    else
    {
        basic.pause(50)
    }
}
})


function hodiny() {
    basic.clearScreen()
    led.plot(0, 0)
    led.plot(0, 1)
    led.plot(0, 3)
    led.plot(0, 4)
    led.plot(4, 0)
    led.plot(4, 1)
    led.plot(4, 3)
    led.plot(4, 4)

    led.plot(1, 0)
    led.plot(2, 0)
    led.plot(3, 0)
    led.plot(1, 4)
    led.plot(2, 4)
    led.plot(3, 4)

    led.plot(1, 2)
    led.plot(2, 2)
    led.plot(3, 2)
}