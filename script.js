const canvas=document.querySelector("#jsCanvas");
const colors=document.getElementsByClassName("jsCol");
const range=document.getElementById("JsRange");
const mode=document.getElementById("jsMode");
const save=document.getElementById("jsSave");
const ctx=canvas.getContext("2d");


canvas.width=600;
canvas.height=370;  

ctx.strokeStyle="black"; 
ctx.lineWidth=2.5;
ctx.fillStyle="white"; 
ctx.fillRect(0, 0, 600, 370);

let painting=false;
let filling=false;

function OnMouseMove(event)
{
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting)
    {
        ctx.beginPath();  
        ctx.moveTo(x,y);
    }
    else  
    {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function OnMouseDown(event)
{
    painting=true;
}
function OnMouseUp()
{
    painting=false;
}
function OnMouseLeave()
{
    painting=false;
}

function HandleCanvasClick()
{
    if(filling)
    {
        ctx.fillRect(0, 0, 600, 370);
    }
}

function handleCM(event)
{
    event.preventDefault();
}
if(canvas)
{
    canvas.addEventListener("mousemove",OnMouseMove);
    canvas.addEventListener("mousedown",OnMouseDown);
    canvas.addEventListener("mouseup",OnMouseUp);
    canvas.addEventListener("mouseleave",OnMouseLeave);
    canvas.addEventListener("click",HandleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

function HandleColorClick(event)
{
    const col=event.target.style.backgroundColor;
    ctx.strokeStyle=col;
    ctx.fillStyle=col;
}

Array.from(colors).forEach(co=>
    co.addEventListener("click",HandleColorClick));


function handlerangeChange(event)
{
    const size=event.target.value;
    ctx.lineWidth=size;
}
    
if(range)
{
    range.addEventListener("input",handlerangeChange);
}

function HandleClickMode()
{
    if(filling===false)  
    {
        filling=true;
        mode.innerText="Paint";

    }
    else{
        filling=false;
        mode.innerText="Fill";
    }
}

if(mode)
{
    mode.addEventListener("click",HandleClickMode)   
}

function handleSaveClick()
{
    const image=canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS";  
    link.click();   
}

if(save)
{
    save.addEventListener("click",handleSaveClick);
}