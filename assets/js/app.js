var cl = console.log;
const stdForm = document.getElementById('stdForm')
const fnamecontrol = document.getElementById('fname')
const lnamecontrol = document.getElementById('lname')
const emailcontrol = document.getElementById('email')
const contactcontrol = document.getElementById('contact')
const stdTable = document.getElementById('stdTable')
const stdinfocontainer = document.getElementById('stdinfocontainer')
const nostdData = document.getElementById('nostdData')
const countstd = document.getElementById('countstd');


let stdArray =[];

const trTemplating=(arr)=>{
    let result =''
    arr.forEach((item,i) => {
        result+=`
        <tr>
        <td>${i+ 1}</td>
        <td>${item.fname}</td>
        <td>${item.lname}</td>
        <td>${item.email}</td>
        <td>${item.contact}</td>
        <td class="text-center">
            <i class="fa-solid fa-2x fa-pen-to-square mr-3 edit"></i>
        </td>
        <td class="text-center">
            <i class="fa-solid fa-2x fa-trash delete"></i>
        </td>
    </tr>
        
        
                `
    });
    stdinfocontainer.innerHTML = result
}

if(localStorage.getItem("stdData")){
    let data = JSON.parse(localStorage.getItem("stdData"));
    stdArray= data;
    trTemplating(data)
    stdTable.classList.remove('d-none');
    // nostdData.classList.add('d-none');
    nostdData.innerHTML = `No of Student Are ${data.length}`


}else{
    stdTable.classList.add('d-none');
    nostdData.classList.remove('d-none');

}


const onStdAdd=(eve)=>{
    eve.preventDefault();
    let stdobj={
        fname : fnamecontrol.value,
        lname : lnamecontrol.value,
        email : emailcontrol.value,
        contact : contactcontrol.value
    }
    cl(stdobj)
    stdArray.unshift(stdobj)
    nostdData.innerHTML = `No of Student Are ${stdArray.length}`
    eve.target.reset();
    stdTable.classList.remove('d-none');
    // nostdData.classList.add('d-none');
    trTemplating(stdArray);
    localStorage.setItem("stdData",JSON.stringify(stdArray)) 
    
}







stdForm.addEventListener("submit",onStdAdd)