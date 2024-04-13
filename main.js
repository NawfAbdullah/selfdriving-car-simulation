const canvas = document.getElementById("carCanvas");
canvas.width = 200;

// save({"levels":[{"inputs":[0.7806416351725475,0.5946785929015457,0,0,0],"outputs":[1,0,0,1,0,0],"biases":[0.1493682150700719,-0.09175342344530467,0.022142265494116558,-0.2606576121238295,0.0005631255908268469,0.2632679829626847],"weights":[[0.18612712978517254,-0.2489125689083829,0.009904276580792386,0.13068839958415146,-0.22406453069933896,-0.35185834949271744],[0.07466646004865143,-0.1891861056077757,-0.08049855534351756,0.2200810640524274,-0.026284738379042313,0.896295916724942],[0.0682376935595092,-0.07722853510952682,-0.09859316179247149,0.012342093850480414,-0.07393566029942975,0.9550823730669915],[-0.04899534424649592,0.08562920213832131,-0.2748651057662209,0.0896888810674117,0.018861444270649112,0.290691739379783],[0.011855046317387536,0.12755833750598666,0.012491031547770898,0.04514911805447075,0.034550173625515934,-0.37323054566933367]]},{"inputs":[1,0,0,1,0,0],"outputs":[1,0,0,0],"biases":[-0.08745578764443393,-0.07348791594532383,-0.009711050107029693,-0.16519341140899435],"weights":[[-0.06713380480021897,-0.12460149635680004,0.03922351236559301,-0.13759427201995064,0.02713976048437047,0.1357194130508756],[0.03815994878067734,0.13263730202580637,-0.035042894834017284,0.011026200185041643,-0.06436843483347517,-0.07190365644820297],[0.117868255134916,-0.02817871929210202,0.16862555410395086,0.13201287311854723,0.13253685009646335,-0.17141307272729503],[0.08543155016472061,-0.08140129885469725,-0.12156780166006878,-0.35550448610619706,0.04207281108242588,0.07617111805041427],[-0.06824236899083894,0.14762010466410597,0.1762932943512021,-0.13051285608739302,0.06864765358981137,-0.03232990320847631],[0.07068188263526756,-0.025293021007377684,0.14096120487867417,0.10133341161944867,0.040409663337622956,-0.13718024236163606]]}]})
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const ctx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(canvas.width/2,canvas.width*0.9,3)
const N=500;
const cars = generateCars(N);
let bestCar = cars[0]
if(localStorage.getItem("bestBrain")){
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )

        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2)
        }
        
    }
    bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"))
}
const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-900,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-1000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-1300,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-1200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-1500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-1500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-1700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-1700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-2000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-2000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-2150,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-2150,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-3100,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-3200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-3200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-3500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-3500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-3700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-3700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-3900,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-4000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-4300,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-3200,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-4500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-4500,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-4700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-4700,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(0),-4000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-4000,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(1),-4150,30,50,'DUMMY',2),
    new Car(road.getLaneCenter(2),-4150,30,50,'DUMMY',2),
    // new Car(road.getLaneCenter(1),-500,30,50,'DUMMY',2),
]






animate();

function generateCars(N) {
    const cars = []
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,'AI'))
    }
    return cars
}

function save(value) {
    if(value){
        localStorage.setItem("bestBrain",JSON.stringify(value))
    }else{
        localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain))
    }
    
}

function discard(){
    localStorage.removeItem("bestBrain")
}


function animate(){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[])
        
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders,traffic)
        
    }

    bestCar = cars.find(
        c=>c.y==Math.min(...cars.map(c=>c.y))
    )
    
    canvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight
    ctx.save()
    ctx.translate(0,-bestCar.y+canvas.height*0.7)
    road.draw(ctx)
    for(let i =0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red")
    }
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(ctx,"blue");
    }
    ctx.globalAlpha = 1;
    bestCar.draw(ctx,"blue",true)
    ctx.restore()
    Visualizer.drawNetwork(networkCtx,bestCar.brain)
    requestAnimationFrame(animate);
}



//const bestbrain = {"levels":[{"inputs":[0.7806416351725475,0.5946785929015457,0,0,0],"outputs":[1,0,0,1,0,0],"biases":[0.1493682150700719,-0.09175342344530467,0.022142265494116558,-0.2606576121238295,0.0005631255908268469,0.2632679829626847],"weights":[[0.18612712978517254,-0.2489125689083829,0.009904276580792386,0.13068839958415146,-0.22406453069933896,-0.35185834949271744],[0.07466646004865143,-0.1891861056077757,-0.08049855534351756,0.2200810640524274,-0.026284738379042313,0.896295916724942],[0.0682376935595092,-0.07722853510952682,-0.09859316179247149,0.012342093850480414,-0.07393566029942975,0.9550823730669915],[-0.04899534424649592,0.08562920213832131,-0.2748651057662209,0.0896888810674117,0.018861444270649112,0.290691739379783],[0.011855046317387536,0.12755833750598666,0.012491031547770898,0.04514911805447075,0.034550173625515934,-0.37323054566933367]]},{"inputs":[1,0,0,1,0,0],"outputs":[1,0,0,0],"biases":[-0.08745578764443393,-0.07348791594532383,-0.009711050107029693,-0.16519341140899435],"weights":[[-0.06713380480021897,-0.12460149635680004,0.03922351236559301,-0.13759427201995064,0.02713976048437047,0.1357194130508756],[0.03815994878067734,0.13263730202580637,-0.035042894834017284,0.011026200185041643,-0.06436843483347517,-0.07190365644820297],[0.117868255134916,-0.02817871929210202,0.16862555410395086,0.13201287311854723,0.13253685009646335,-0.17141307272729503],[0.08543155016472061,-0.08140129885469725,-0.12156780166006878,-0.35550448610619706,0.04207281108242588,0.07617111805041427],[-0.06824236899083894,0.14762010466410597,0.1762932943512021,-0.13051285608739302,0.06864765358981137,-0.03232990320847631],[0.07068188263526756,-0.025293021007377684,0.14096120487867417,0.10133341161944867,0.040409663337622956,-0.13718024236163606]]}]}