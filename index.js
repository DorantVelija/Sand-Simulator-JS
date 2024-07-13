document.addEventListener('DOMContentLoaded', () => {
    constructGrid(100,70, 10)
   // constructGrid(15,15, 10)
})

function constructGrid(nRows, nCols, nSpeed){
    let grid = document.getElementById('grid-container')
    grid.innerHTML = ' ' // clear previous grid

    let fragment = document.createDocumentFragment();
    let rows = nRows
    let cols = nCols
    let speed = nSpeed
    let hue = 360
    let color = `hsl(${hue}, 100%, 50%)`
    let isDragging = false  // to check if mouse is being draggeds
    let sandColor

    function changeSand(color){
        sandColor = color
    }

    for (let i = 0; i < rows; i++) {
        let gridRow = document.createElement('div')
        gridRow.classList.add('grid-row')
        for (let j = 0; j < cols; j++) {
            let gridItem = document.createElement('div')
            gridItem.classList.add('grid-pixel')
            gridItem.setAttribute('posY', `${i}`);
            gridItem.setAttribute('posX', `${j}`);
            gridRow.appendChild(gridItem)

            gridItem.addEventListener('mousedown', function() {
                isDragging = true
                this.style.backgroundColor = `${sandColor}`;
                gravity(this, speed)
            });
            gridItem.addEventListener('mousemove', function() {
                if (isDragging) {
                    this.style.backgroundColor = 'blue'
                    gravity(this, speed)
                }
            })
            document.addEventListener('mouseup', function() {
                isDragging = false
            })
        }
        fragment.appendChild(gridRow)
    }
    grid.appendChild(fragment)
}

function getSpecificElement(x, y){
    let selector = `[posX="${x}"][posY="${y}"]`;
    return document.querySelector(selector)
}

function gravity(element, speed){
    let posY = parseInt(element.getAttribute('posY') , 10)
    let posX =  parseInt(element.getAttribute('posX'), 10)
    function applyGravity() {
        // Check condition and perform actions
        if (getSpecificElement(posX - 1, posY).style.backgroundColor === "") {
            getSpecificElement(posX, posY).style.backgroundColor = "";
            getSpecificElement(posX - 1, posY).style.backgroundColor = 'blue';
            posX--;
            // Call applyGravity again after a delay
            setTimeout(applyGravity, speed);
        }
        else if(getSpecificElement(posX - 1, posY - 1).style.backgroundColor === ""){
            getSpecificElement(posX, posY).style.backgroundColor = "";
            getSpecificElement(posX - 1, posY-1).style.backgroundColor = 'blue';
            posX--;
            posY--;
            // Call applyGravity again after a delay
            setTimeout(applyGravity, speed);
        }
        else if(getSpecificElement(posX - 1, posY + 1).style.backgroundColor === ""){
            getSpecificElement(posX, posY).style.backgroundColor = "";
            getSpecificElement(posX - 1, posY +1).style.backgroundColor = 'blue';
            posX--;
            posY++;
            // Call applyGravity again after a delay
            setTimeout(applyGravity, speed);
        }
    }
    // Start the gravity simulation
    applyGravity();
}

function changeGridSize(){
    let rows = document.getElementById('in-rows').value
    let cols = document.getElementById('in-cols').value
    let speed = document.getElementById('in-speed').value
    if(rows === 0){
        rows = 100
    }
    if(cols === 0){
        cols = 70
    }
    if (speed === 0){
        speed = 20
    }
    constructGrid(rows, cols, speed)
}