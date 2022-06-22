class Characters {
    constructor(name, superPower){
        this.name = name;
        this.superPower = superPower;
    }
    describe(){
        return `${this.name} has ${this.superPower}.`;
    }
}

class Movies {
    constructor (name){
        this.name = name;
        this.characters = [];
    }

    addCharacters (characters) {
        if (characters instanceof Characters){
            this.characters.push (characters);
        }else {
            throw new Error(`You can only add an instance of Character. Argument is not a character: ${characters}`);
        }
    } 
    describe() {
        return `${this.name} has ${this.characters.length} characters.`;
    }
}

class Menu {
    constructor() {
        this.movies = [];
        this.selectedMovie = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createMovies();
                    break;
                case '2':
                    this.viewNewMovie();
                    break;
                case '3':
                    this.deleteMovies();
                    break;
                case '4':
                    this.displayAllMovies();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert (`Good bye`);
    }

showMainMenuOptions(){
    return prompt (`
    Avenger Movies!
    0) exit
    1) add new movie
    2) view new movie
    3) delete movie
    4) view all movie
    `)
    
    }
    showNewMoviesMenuOptions(moviesInfo){
        return prompt (`
        What characters are in this movie?
        0) back
        1) create character
        2) delete character
        -----------------------------------
        ${moviesInfo}
        `);
    }    



    displayAllMovies() {
        let moviesString = "";
        for (let i = 0; i < this.movies.length; i++) {
            moviesString += i + ") " + this.movies[i].name + '\n';
        }
        alert (moviesString);
    }
        createMovies(){
            let name = prompt (`Enter a name of the Avenger movie:`);
            this.movies.push(new Movies(name));
        }
        viewNewMovie(){
            let index = prompt (`Enter the index of the Avenger Movie you wish to view:`);
            if (index > -1 && index < this.movies.length) {
                this.selectedMovie = this.movies[index];
                let description = 'Movie Name: ' + this.selectedMovie.name + '\n';
                 

                for (let i = 0; i < this.selectedMovie.characters.length; i++) {
                    description += i + " ) " + this.selectedMovie.characters[i].name + ' - ' + this.selectedMovie.characters[i].superPower + '\n';
                }
                let selection = this.showNewMoviesMenuOptions (description);
                switch (selection){
                    case '1':
                    this.createCharacter();
                    break;
                    case '2':
                    this.deleteCharacter();
                }
            }
        }

        deleteMovies () {
            let index = prompt(`Enter the index of the Movie you wish to delete:`);
            if (index > -1 && index < this.movies.length) {
                this.movies.splice (index, 1);
         }
    }
        
        createCharacter() {
            let name = prompt (`Enter the name of the character:`);
            let superPower = prompt (`Enter the superpower of the character:`);
            this.selectedMovie.characters.push(new Characters(name, superPower));
    }
        deleteCharacter() {
            let index = prompt (`Enter the index of the character you wish to delete:`);
            if (index > -1 && index < this.selectedMovie.characters.length) {
                this.selectedMovie.characters.splice(index, 1);
        }
    }
}

    let menu = new Menu();
    menu.start();