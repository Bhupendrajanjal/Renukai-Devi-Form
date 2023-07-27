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
const submitbtn = document.getElementById("submitbtn")
const stdupdatebtn = document.getElementById("stdupdatebtn")

let stdArray =[];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  var userID=uuid();


const trTemplating=(arr)=>{
    let result =''
    arr.forEach((item,i) => {
        result+=`
        <tr id="${item.stdId}">
            <td>${i+ 1}</td>
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.email}</td>
            <td>${item.contact}</td>
            <td class="text-center">
                <i class="fa-solid fa-2x fa-pen-to-square mr-3 edit" onclick="onStdEdit(this)"></i>
            </td>
            <td class="text-center">
                <i class="fa-solid fa-2x fa-trash delete" onclick="onStdDelete(this)"></i>
            </td>
    </tr>
        
        
                `
    });
    stdinfocontainer.innerHTML = result
}


const onStdEdit = (ele)=>{
    cl(ele.closest("tr").id,"Edited")
    let edited = ele.closest("tr").id;
    cl(edited)
    localStorage.setItem("ediId".edited)


    let editobj = stdArray.find(std=>{
        return std.stdId === edited
    })
    cl(editobj)
    fnamecontrol.value = editobj.fname;
    lnamecontrol.value = editobj.lname;
    emailcontrol.value = editobj.email;
    contactcontrol.value = editobj.contact;

    stdupdatebtn.classList.remove('d-none')
    submitbtn.classList.add('d-none')
}

const onStdDelete = (ele)=>{
    cl(ele.closest("tr").id,"Deleted")

    let Deleted = ele.closest("tr").id;
    cl(Deleted)
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
        contact : contactcontrol.value,
        stdId : uuid(),
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


const onstdInfoUpdate = ()=>{
    let updateId = localStorage.getItem("editedId")

    let updatedobj = {
        fname : fnamecontrol.value,
        lname : lnamecontrol.value,
        email : emailcontrol.value,
        contact : contactcontrol.value,

    }
    cl(updatedobj)
}

stdForm.addEventListener("submit",onStdAdd)
stdupdatebtn.addEventListener("click", onstdInfoUpdate)