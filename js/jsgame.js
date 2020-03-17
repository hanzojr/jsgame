var canvas, ctx, ALGURA, LARGURA, frames=0, maxPulos=3, velocidade = 3,

    bloco = {
        x: 50,
        y: 0,
        altura: 50,
        largura: 50,
        cor: "#ff4e4e",
        gravidade: 1.6,
        velocidade: 0,
        forcaDoPulo: 23.6,
        qtdPulos: 0,

        atualiza: function() {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;

            //tocou o chao
            if(this.y > chao.y - this.altura) {
                this.y = chao.y - this.altura;
                this.qtdPulos = 0;
            }

        },

        pula: function() {
            if(this.qtdPulos < maxPulos) {
                this.velocidade = -this.forcaDoPulo;
                this.qtdPulos++;
            }


        },

        desenha: function() {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);

        }

    },

    obstaculos = {
        _obs: [],
        cores: ["#ffbc1c","#ff1c1c","#ff85e1","52a7ff","#78ff5d"],


        insere: function() {
            this._obs.push({
                x: LARGURA,
                largura: 30 + Math.floor(21 * Math.random()),
                altura: 30 + Math.floor(120 * Math.random()),
                cor: this.cores[Math.floor(5 * Math.random())]

            });
        },

        atualiza: function() {
            for(i = 0, tam = this._obs.length; i< tam; i++) {
                var obs = this._obs[i];
                obs.x -= velocidade;

            }

        },

        desenha: function() {

            for(i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                ctx.fillStyle = obs.cor;
                ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);

            }

        }
        
    },

    chao = {
        y: 550,
        altura: 50,
        cor: "#ffdf70",

        desenha: function(){
            ctx.fillStyle = this.cor;
            ctx.fillRect(0, this.y, LARGURA, this.altura)
        }

    };

function clique(event) {
   bloco.pula();
}

function main() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >=500) {
        LARGURA = 600;
        ALTURA = 600;
    }
    
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", clique);

    roda();

}

function roda() {
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);
}

function atualiza() {
    frames++;

    bloco.atualiza();
    obstaculos.atualiza();

}

function desenha() {
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    chao.desenha();
    obstaculos.desenha();
    bloco.desenha();


}

