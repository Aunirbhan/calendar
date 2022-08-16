let j = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let calendar = document.getElementById('daysofmonth');
let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let newEventModal = document.getElementById('newEventModal');
let deleteEventModal = document.getElementById('deleteEventModal');
let backDrop = document.getElementById('modalBackDrop');
let eventTitleInput = document.getElementById('eventTitleInput');
let eventTimeInput = document.getElementById('eventTimeInput');

function onload() {
  let date = new Date();
  if (j !== 0) {
    date.setMonth(new Date().getMonth() + j);
  }
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let dayOne = new Date(year, month, 1);
  let totalDays = new Date(year, month + 1, 0).getDate();

  let dateString = dayOne.toLocaleDateString('default', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  let emptyDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthsandyear').innerText =
    `${date.toLocaleDateString('default', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= emptyDays + totalDays; i++) {
    let daySquare = document.createElement('div');
    daySquare.classList.add('day');

    let dayString = `${month + 1}/${i - emptyDays}/${year}`;

    if (i > emptyDays) {
      daySquare.innerText = i - emptyDays;
      let eventForDay = events.find(e => e.date === dayString);

      if (i - emptyDays === day && j === 0) {
        daySquare.id = 'currentDay';
      }
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}

function buttons() {
  document.getElementById('next').addEventListener('click', () => {
    j++;
    onload();
  });

  document.getElementById('back').addEventListener('click', () => {
    j--;
    onload();
  });
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

function openModal(date) {
  clicked = date;
  let eventForDay = events.find(e => e.date === clicked);
  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  eventTimeInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  eventTimeInput.value = '';
  clicked = null;
  onload();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    events.push({
      date: clicked,
      title: eventTitleInput.value + " " + eventTimeInput.value
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function changeDiv(div,output){
      color = document.getElementById(div).style.color;
      backgroundColor = document.getElementById(div).style.backgroundColor;
      fontSize = document.getElementById(div).style.fontSize;
      textDecoration = document.getElementById(div).style.textDecoration;

      let input1 = document.getElementById("input1").value;
      let input2 = document.getElementById("input2").value;
      let input3 = document.getElementById("input3").value;
      let input4 = document.getElementById("input4").value;
      let input5 = document.getElementById("input5").value;

      document.getElementById("heading").style.backgroundColor = input1;
      document.getElementById("webpage").style.backgroundColor = input2;
      document.getElementById("webpage").style.color = input3;
      document.getElementById("heading").style.fontSize = input4;
      document.getElementById("heading").style.textDecoration = input5;
    }
    function restoreDiv(div, output){
      document.getElementById("webpage").style.color = color;
      document.getElementById("heading").style.backgroundColor = backgroundColor;
      document.getElementById("heading").style.fontSize = fontSize;
      document.getElementById("heading").style.textDecoration = textDecoration;
      document.getElementById("webpage").style.backgroundColor = backgroundColor;
    }

buttons();
onload();
