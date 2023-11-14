let scrollID;



  const coolDown = 1500 // 5s cooldown
  let lastClick = Date.now() - coolDown // to start fresh
  
let stopped = true;


let scrollSpeed = 1; // 1 - Fast | 2 - Medium | 3 - Slow


let scrollInterval = scrollSpeed * 3;


// PS! Replace this with your own channel ID


// If you use this channel ID your app will stop working in the future


const CLIENT_ID = '5Qcspn6KZFL4fZ97';






let drone = new ScaleDrone(CLIENT_ID, {


 data: { // Will be sent out as clientData via events


   name: getRandomName(),


   color: getRandomColor(),


 },


});







let members = [];







drone.on('open', error => {


 if (error) {


   return console.error(error);


 }


 console.log('Successfully connected to Scaledrone');







 const room = drone.subscribe('observable-room');


 room.on('open', error => {


   if (error) {


     return console.error(error);


   }


   console.log('Successfully joined room');


 });







 room.on('members', m => {


   members = m;


   updateMembersDOM();


 });







 room.on('member_join', member => {


   members.push(member);


   updateMembersDOM();


 });







 room.on('member_leave', ({id}) => {


   const index = members.findIndex(member => member.id === id);


   members.splice(index, 1);


   updateMembersDOM();


 });







 room.on('data', (text, member) => {


   if (member) {


     addMessageToListDOM(text, member);


   } else {


     // Message is from server


   }


 });


});







drone.on('close', event => {


 console.log('Connection was closed', event);


});







drone.on('error', error => {


 console.error(error);


});







function getRandomName() {




   
 return "Dirty Dan";
  



}







function getRandomColor() {


 return '#19b6f';


}







//------------- DOM STUFF







const DOM = {


 membersCount: document.querySelector('.members-count'),


 membersList: document.querySelector('.members-list'),


 messages: document.querySelector('.messages'),


 input: document.querySelector('.message-form__input'),


 form: document.querySelector('.message-form'),


};







DOM.form.addEventListener('submit', sendMessage);





function startScrolling(){


let ID = setInterval(function() {


  window.scrollBy(0, 2);


    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {


       // Reached end of page


       stopScroll();


    }


  }, scrollInterval);


return ID;






}

function startCoolDown () {
  lastClick = Date.now() // maybe useless function
}
function checkCoolDown () {
  const notOver = Date.now() - lastClick < coolDown
  if (notOver){
    var audio = new Audio('stopspamming.mp3');
    audio.play();
  }
  // using an alert it will block javascript loops
  return !notOver;
}


function sendMessage() {



  
    if (checkCoolDown()) {
      startCoolDown()
    
const value = DOM.input.value;


 if (value === '') {


   return;


 }
 DOM.input.value = '';


 drone.publish({


   room: 'observable-room',


   message: value,


 });

      if (value == "2 + 2 = 4" || value == "2+2=4"){
drone = new ScaleDrone(CLIENT_ID, {


 data: { // Will be sent out as clientData via events


   name: "The One",


   color: getRandomColor(),


 },


});
 drone.publish({


   room: 'observable-room',


   message: "It is coming...",


 });
        drone = new ScaleDrone(CLIENT_ID, {


 data: { // Will be sent out as clientData via events


   name: getRandomName(),


   color: getRandomColor(),


 },


});
      }
      // do your stuff with arguments here
    }
}

 







function createMemberElement(member) {


 const { name, color } = member.clientData;


 const el = document.createElement('div');


 el.appendChild(document.createTextNode(name));


 el.className = 'member';


 el.style.color = color;


 return el;


}







function updateMembersDOM() {


 DOM.membersCount.innerText = `${members.length} nerds in room:`;


 DOM.membersList.innerHTML = '';


 members.forEach(member =>


   DOM.membersList.appendChild(createMemberElement(member))


 );


}


//dont look at this next part if you are sensitive to swear words







function createMessageElement(text, member) {



// let gamer = text.replace(/[^A-Za-z0-9\s!?]/g,”);
// testing to see if this is the problem



 

  const el = document.createElement('div');


 el.appendChild(createMemberElement(member));


 el.appendChild(document.createTextNode(text));


 el.className = 'message';



 return el;


}



function stopScroll() {


clearInterval(scrollID);


}







function addMessageToListDOM(text, member) {






 const el = DOM.messages;


 const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;


 el.appendChild(createMessageElement(text, member));

 if (wasTop) {


   el.scrollTop = el.scrollHeight - el.clientHeight;


  


 }


      if(stopped == true) {


      scrollID = startScrolling();


      stopped = false;


    }else {


      stopScroll();


      stopped = true;


    }


}
