let GameDiv = document.getElementById("GameStuff")
let PregameDiv = document.getElementById("PregameStuff")
GameDiv.style.visibility = "hidden"
PregameDiv.style.visibility = "hidden"

let Potato = {
    Health: 100,
    Hunger: 100,
    Hydration: 100,
    LastEaten: 0,
    LastDrank: 0,
    LastCollection: 0,
    Food: 3,
    Drinks: 3,
    Money: 0,
}

let TimePlayed = 0
let Difficulty = "Normal"
let GameOver = false
let GameStarted = false

function UpdateStats() {
    let HealthText = document.getElementById("PotatoHealth")
    let HungerText = document.getElementById("PotatoHunger")
    let HydrationText = document.getElementById("PotatoHydration")
    let MoneyText = document.getElementById("PotatoMoney")
    let FoodText = document.getElementById("PotatoFood")
    let DrinksText = document.getElementById("PotatoDrinks")
    HealthText.innerHTML = HealthText.innerHTML.replace(HealthText.textContent, "Potato Health = " + Potato.Health)
    HungerText.innerHTML = HungerText.innerHTML.replace(HungerText.textContent, "Potato Hunger = " + Potato.Hunger)
    HydrationText.innerHTML = HydrationText.innerHTML.replace(HydrationText.textContent, "Potato Hydration = " + Potato.Hydration)
    MoneyText.innerHTML = MoneyText.innerHTML.replace(MoneyText.textContent, "Money = " + Potato.Money)
    FoodText.innerHTML = FoodText.innerHTML.replace(FoodText.textContent, "Food = " + Potato.Food)
    DrinksText.innerHTML = DrinksText.innerHTML.replace(DrinksText.textContent, "Drinks = " + Potato.Drinks)
}

function GetMoney() {
    if (GameOver == false) {
        if (TimePlayed - Potato.LastCollection >= 1) {
            Potato.LastCollection = TimePlayed
            Potato.Money = Potato.Money + 1
        }
    }

    UpdateStats()
}

function BuyFood() {
    if (GameOver == false) {
        if (Potato.Money - 20 >= 0) {
            Potato.Money = Potato.Money - 20
            Potato.Food = Potato.Food + 1
        }
    }

    UpdateStats()
}

function FeedPotato() {
    if (GameOver == false) {
        if (Potato.Food >= 1) {
            if (TimePlayed - Potato.LastEaten >= 1) {
                Potato.Food = Potato.Food - 1
                Potato.LastEaten = TimePlayed
                Potato.Hunger = Potato.Hunger + 25

                if (Potato.Hunger > 100) {
                    Potato.Hunger = 100
                }
            }
        }
    }

    UpdateStats()
}

function BuyDrinks() {
    if (GameOver == false) {
        if (Potato.Money - 10 >= 0) {
            Potato.Money = Potato.Money - 10
            Potato.Drinks = Potato.Drinks + 1
        }
    }

    UpdateStats()
}

function FeedPotatoDrinks() {
    if (GameOver == false) {
        if (Potato.Drinks >= 1) {
            if (TimePlayed - Potato.LastDrank >= 1) {
                Potato.Drinks = Potato.Drinks - 1
                Potato.LastDrank = TimePlayed
                Potato.Hydration = Potato.Hydration + 25
    
                if (Potato.Hydration > 100) {
                    Potato.Hydration = 100
                }
            }
        }
    }

    UpdateStats()
}

UpdateStats()

function CheckIfDie() {
    let HasDied = false

    if (Potato.Health <= 0) {
        HasDied = true
    } else if (Potato.Hunger <= 0) {
        HasDied = true
    } else if (Potato.Hydration <= 0) {
        HasDied = true
    }

    return HasDied
}

function RestartGame() {
    location.reload()
}

function ShowTutorialText() {
    //document.getElementById("TutorialStuff").innerHTML = "Whatup" + "<br>" +"Not Much"
    document.getElementById("TutorialStuff").innerHTML = "Welcome to Potato Owning Simulator!" + "<br>" + "<br>" + "To gain money, click the potato in the middle of the screen. You can gain 1 money per second."
    + "<br>" + "<br>" + "Overtime, you Potato will starve and become dehydrated. To prevent this, you can buy food and drinks for your potato with money. You can feed your potato food and drinks and it will replenish its Hunger and Hydration levels."
}

function ShowUpcomingText() {
    document.getElementById("TutorialStuff").innerHTML = "Planned Future Updates:" + "<br>" + "<br>"
    + "Potato Battling - Fight against other potatoes and survive" + "<br>" + "<br>"
    + "Difficulty Levels - Make the game easier, or harder" + "<br>" + "<br>"
    + "Potato Sitter - You will no longer be able to gain money from clicking your potato, instead you will automatically get +1 money per second automatically" + "<br>" + "<br>"
    + "Potato Maid - A maid will take care of your potato's hydration and hunger levels by using your money to buy food / drinks for it and feed it automatically" + "<br>" + "<br>"
    + "[NOT CONFIRMED] Potato Customisation - Customise your potato with hats and clothes"
}

function StartGame() {
    GameStarted = true
}

var ForeverLoop = setInterval(function() {
    if (GameStarted == true) {
        let GameDiv = document.getElementById("GameStuff")
        let PregameDiv = document.getElementById("PregameStuff")

        GameDiv.style.visibility = "visible"
        PregameDiv.style.visibility = "hidden"
        
        let HasDied = CheckIfDie()

        if (HasDied) {
            if (GameOver == false) {
                GameOver = true
                document.getElementById("GameOverBox").innerHTML = "Game Over: Your Potato Died :("
                document.getElementById("GameOverButtonArea").innerHTML = '<button class="GameOverButton" onclick="RestartGame()">Restart</button>'
            }
        } else {
            if (Difficulty == "Normal") {
                if ((TimePlayed - Potato.LastEaten) >= 5) {
                    console.log("Test2")
                    Potato.Hunger = Potato.Hunger - 0.5
                }
                if ((TimePlayed - Potato.LastDrank) >= 5) {
                    Potato.Hydration = Potato.Hydration - 0.5
                }
            }
        
            TimePlayed = TimePlayed + 1
        }
        UpdateStats()
    } else {
        let GameDiv = document.getElementById("GameStuff")
        let PregameDiv = document.getElementById("PregameStuff")

        GameDiv.style.visibility = "hidden"
        PregameDiv.style.visibility = "visible"
    }
}, 1000);