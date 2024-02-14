window.onload = function(){
    const canvas = document.getElementById('cnavas1');
    const ctx = canvas.getContext('2d');

    const gol = new GolEffect(ctx, canvas.width, canvas.height);
}

class GolEffect {
    #ctx; // specify the canvas element
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        console.log('effect loaded');
    }
    #draw
}
