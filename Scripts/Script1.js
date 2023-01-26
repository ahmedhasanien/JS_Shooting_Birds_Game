
 //console.log(location.search)

let fname = location.search.slice(8) ; // get data from url of form
 //console.log(fname)

document.querySelector("li").innerHTML =fname ; 

document.querySelector(".UserName").innerHTML="Welcome " + fname ; 
localStorage.setItem("Name : " , fname) ; 
let seconds = 60 ; 
let gametimer=document.querySelector(".timer") ;

function timer() 
{
  let min = Math.floor(seconds/60) ; 
  let remsec=seconds%60 ; 
  gametimer.innerHTML=min + ":" + remsec ; 
  if(seconds>0)
  {
    seconds-- ; 
  }
  else
  {
    var mybirds =  document.querySelectorAll(".bird") ;
    for(let i=0;i<mybirds.length;i++)
    {
      console.log("ENDDDDDDDDDDDDDDDDDDDDDDD");
      mybirds[i].remove() ;

    }
    var bomb = document.querySelectorAll(".booomb")
    for (let index = 0; index <bomb.length; index++) {
     bomb[index].remove() ; 
      
    }
     document.querySelector(".showscore").style.display="block" ;
     let scoreofgame =parseInt( document.querySelector(".score").innerHTML.split(': ')[1] )  ; 
    console.log("type of score " +typeof scoreofgame);//number
     console.log("The Score of Game  = "  + scoreofgame);
      if(scoreofgame>=50)
      {
        console.log("WINNNNNNNER");
        document.querySelector(".pres").innerHTML="YOU WIN" ;
       let happybird =  document.querySelector(".imgres") ; 
       happybird.setAttribute("src" , "../images/HappyBird.jpeg") ; 
      }
      else
      {
        document.querySelector(".pres").innerHTML="YOU LOSE" ;
        let sadbird = document.querySelector(".imgres") ; 
        sadbird.setAttribute("src" , "../images/SadBird.jpeg") ; 
     //   document.querySelector(".imgres").append(sadbird) ; 

      }
      let playagain = document.querySelector(".bres") ; 
      playagain.addEventListener("click" , function(){
        console.log("Refresshhhhhhhhhhhh");
        location.reload(true);
      })

     
     

  }

}

 document.querySelector(".StartGames").addEventListener("click" , function () {
       document.querySelector(".welcome").style.display = "none"   ; 
        createBird() ; // movbird
        createBomb(); // movbomb
        let countdown = setInterval(() => {
         timer()
        }, 1000);
 })


 let myBirds=[ "../images/bird3.gif",  "../images/bird2.gif" ,  "../images/bird1.gif"] ;
 let killed =0 ; 
 let score =0 ; 

function createBird()
{
let stopbird =   setInterval(() => {
   let randomBird=myBirds[Math.floor(myBirds.length * Math.random())]  ;
  let topofgame = Math.floor(Math.random()*10) *50 ; 
  let img = document.createElement("img") ;
  img.setAttribute("src" , randomBird) 
  img.classList.add("bird") ; 
  img.style.left="0px";
  img.style.top=topofgame+"px";
  document.querySelector(".Birds").append(img) ; 
  moveBirds(img,0) ; 
  img.addEventListener("click" , function(){
  img.remove() ; 
  killed++ ;
  document.querySelector(".kiil").innerHTML="Killed Birds : "+killed
  })
  
  //let birdAction = document.querySelectorAll(".bird") ;
   birdkill = document.querySelectorAll(".bird") ; 
  
  }, 1000);
  setTimeout(() => {
    clearInterval(stopbird) ;
  }, 60000);
}
function range(start, end) {
  let rng = [];
  console.log("start = " + start);
  console.log("end = " + end);
  console.log(end);
  for (let i = start; i <= end; i++) {
      rng.push(i);
  }
  return rng;
}

function createBomb()
{
 let stopbomb =  setInterval(() => {
  let leftofboomb = Math.floor(Math.random()*10) *100 ; 
 // console.log("left = " + leftofboomb);
  console.log("boom position " + leftofboomb);
  let bombimg= document.createElement("img") ; 
  bombimg.setAttribute("src" , "../images/bomb3.png") ; 
  bombimg.classList.add("booomb") ;
  bombimg.style.mixBlendMode="multiply";
  bombimg.style.top="0px" ; ;
  bombimg.style.left= leftofboomb+"px" ; 
  document.querySelector(".Birds").append(bombimg) ; 
  moveBomb(bombimg,0)

  bombimg.addEventListener("click" , function()
  {
    console.log("Event Firiinnnnnnnnng ");
   // let mybirdx= [] parseInt(slice(img.style.left)) ; 
   
   var mybirds =  document.querySelectorAll(".bird") ;
   for(let i=0;i<mybirds.length;i++)
   {
     let imgLeft=mybirds[i].style.left;
     let imgLeftvalue = parseInt(imgLeft.slice(0,imgLeft.indexOf('p') ))  ; 
      console.log("Mybird is " + imgLeftvalue);
    let imgTop=mybirds[i].style.top; 
    let imgTopValue=parseInt( imgTop.slice(0 ,imgTop.indexOf('p') )); 
    console.log("Mybird is top  " + imgTopValue);
      // mybirds[i].style.display="none" ; 
      let btop = bombimg.style.top ; 
      let btopvalue = parseInt( btop.slice(0,btop.indexOf('p'))) ;
      console.log("MyBoomb is top  " + btopvalue);
      let bombRangeTop  = range(btopvalue-50,btopvalue+bombimg.height+50)  ; 
    console.log("==============================");
    let boomRangeLeft = range(leftofboomb-50, leftofboomb+bombimg.width+50) ; 
        console.log("boomb range  left  is = " +boomRangeLeft) ;
        //console.log("top = " + btopvalue);
        //console.log( "boomb img height = " + bombimg.height);
        
        if(bombRangeTop.includes(imgTopValue) && boomRangeLeft.includes(imgLeftvalue))
        {
          killed++ ; 
          document.querySelector(".kiil").innerHTML="Killed Birds : "+killed
           mybirds[i].remove() ; 
          console.log("deleeeeeeeeeeeeeeeeeeeeted");

          if(mybirds[i].src.slice(mybirds[i].src.indexOf("image"))=="images/bird1.gif" ) 
          {
            score-=10;
          }
          else if(mybirds[i].src.slice(mybirds[i].src.indexOf("image"))== "images/bird2.gif") 
          {
            score+=10 ;
          }
          else
          {
            score+=5 ;

          }
          document.querySelector(".score").innerHTML="Score : "+score
        }
 
   }


    bombimg.remove() ; 
  })

 }, 2000);
 setTimeout(() => {
   clearInterval(stopbomb) ; 
 }, 60000);
}



//console.log("My Bird is  " + randomBird) ; 

function moveBirds(img,left)
{
//let left=-60;
var inv = setInterval(() => {
  if(left<=window.innerWidth-img.width-50)
  {
    left+=20; 
    img.style.left=left+'px';
    // console.log(img.style.left);
    // console.log(img.style.top);
  }
  else
  {
    // console.log("ay hagaaaaaaaaaaaaaaaa");
    img.remove() ; 
    clearInterval(inv) ;   
    
  }
}, 200);
}


function moveBomb(bombimg,top)
{

var inv = setInterval(() => {
  if(top<=window.innerHeight-bombimg.height-50)
  {
    top+=20; 
    bombimg.style.top=top+'px';
    // console.log(bombimg.style.left);
    // console.log(bombimg.style.top);
  }
  else
  {
    // console.log("Boomb endddddddded "); 
    bombimg.remove() ; 
    clearInterval(inv) ; 
  }
}, 100);
}
