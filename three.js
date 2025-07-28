

// window.addEventListener("DOMContentLoaded", () => {
//   const input = document.getElementById("input");
//   const taskList = document.getElementById("task-ls");
//   const btn = document.querySelector(".btn");
//   const checkSound = document.getElementById("check-sound");

 


// //====>input===================
//   function addTask() {
//     let taskValue = input.value;

//     if (!taskValue) {
//       alert("enter the value");
//     }
//     else{
//         let li=document.createElement("li");
//         let span =document.createElement("span");

//         li.innerHTML=taskValue;
//         taskList.appendChild(li)

//         span.innerHTML="&times";
//         li.appendChild(span);
//     }
//     input.value = "";
//     setTask();
//   }
// //add task button
//   btn.addEventListener("click", addTask);

//   taskList.addEventListener("click",function(e){
//    if( e.target.tagName ==='LI'){
//     e.target.classList.toggle("checked");
//      checkSound.currentTime = 0; // rewind in case sound is played fast
//         checkSound.play();
//     setTask();
//    }
//    else if(e.target.tagName==="SPAN"){
//     e.target.parentElement.remove();
//     setTask();
//    }
//   })
// input.addEventListener("keydown" , function(e){
//     if(e.key === "Enter"){
//         addTask();
//     }
// })

// function setTask(){
//     localStorage.setItem("lists",taskList.innerHTML)
// }
// function loadTasks(){
//     taskList.innerHTML=localStorage.getItem("lists")
// }
// loadTasks();
// }); =============================================================11==========================================================


// window.addEventListener("DOMContentLoaded", () => {
//   const input = document.getElementById("input");
//   const taskList = document.getElementById("task-ls");
//   const btn = document.querySelector(".btn");
//   const checkSound = document.getElementById("check-sound");

//   let mediaRecorder;
//   let currentChunks = [];
//   let recordingTargetId = null;

//   async function initMedia() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = (e) => {
//       currentChunks.push(e.data);
//     };

//     mediaRecorder.onstop = async () => {
//       const blob = new Blob(currentChunks, { type: 'audio/webm' });
//       const base64 = await blobToBase64(blob);
//       currentChunks = [];

//       // Save audio Base64 to task
//       const taskItems = JSON.parse(localStorage.getItem("tasks")) || [];
//       const index = taskItems.findIndex(t => t.id === recordingTargetId);
//       if (index !== -1) {
//         taskItems[index].audio = base64;
//         localStorage.setItem("tasks", JSON.stringify(taskItems));
//         loadTasks(); // reload to reflect
//       }
//     };
//   }

//   function blobToBase64(blob) {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.readAsDataURL(blob);
//     });
//   }

//   function generateId() {
//     return "_" + Math.random().toString(36).substr(2, 9);
//   }

//   function createTaskElement(task) {
//     const li = document.createElement("li");
//     if (task.checked) li.classList.add("checked");
//     li.dataset.id = task.id;
//     li.innerHTML = task.text;

//     // Delete button
//     const span = document.createElement("span");
//     span.innerHTML = "&times;";
//     li.appendChild(span);

//     // 🎙️ Record Button
//     const recordBtn = document.createElement("button");
//     recordBtn.textContent = "🎙️";
//     recordBtn.classList.add("record-btn");
//     recordBtn.style.marginRight = "10px";
//     li.appendChild(recordBtn);

//     // 🔊 Audio Player
//     const audio = document.createElement("audio");
//     audio.controls = true;
//     audio.style.display = task.audio ? "block" : "none";
//     if (task.audio) audio.src = task.audio;
//     li.appendChild(audio);

//     taskList.appendChild(li);
//   }

//   function addTask() {
//     const taskValue = input.value.trim();
//     if (!taskValue) {
//       alert("enter the value");
//       return;
//     }

//     const newTask = {
//       id: generateId(),
//       text: taskValue,
//       checked: false,
//       audio: null
//     };

//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.push(newTask);
//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     input.value = "";
//     loadTasks();
//   }

//   btn.addEventListener("click", addTask);

//   input.addEventListener("keydown", function (e) {
//     if (e.key === "Enter") addTask();
//   });

//   taskList.addEventListener("click", async function (e) {
//     const li = e.target.closest("li");
//     if (!li) return;
//     const taskId = li.dataset.id;

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const taskIndex = tasks.findIndex(t => t.id === taskId);
//     if (taskIndex === -1) return;

//     // Mark checked
//     if (e.target.tagName === 'LI' && !e.target.classList.contains("record-btn")) {
//       li.classList.toggle("checked");
//       tasks[taskIndex].checked = li.classList.contains("checked");
//       checkSound.currentTime = 0;
//       checkSound.play();
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }

//     // Delete task
//     else if (e.target.tagName === "SPAN") {
//       tasks.splice(taskIndex, 1);
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//       loadTasks();
//     }

//     // Record voice note
//    else if (e.target.closest(".record-btn")) {
//   const recordBtn = e.target.closest(".record-btn");

//   if (!mediaRecorder) await initMedia();

//   if (mediaRecorder.state === "inactive") {
//     recordingTargetId = taskId;
//     currentChunks = [];
//     mediaRecorder.start();
//     recordBtn.innerHTML = `<img src="./image/icon.jpeg" alt="stop" width="24px">`;
//   } else {
//     mediaRecorder.stop();
//     recordBtn.innerHTML = `<img src="./image/uncheked.jpg" alt="Mic" width="24px">`;
//   }
// }

//   });

//   function loadTasks() {
//     taskList.innerHTML = "";
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.forEach(createTaskElement);
//   }

//   loadTasks();
// });


//-----------------------------------------------222--------------------------------------------------------------------------------



window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const taskList = document.getElementById("task-ls");
  const btn = document.querySelector(".btn");
  const checkSound = document.getElementById("check-sound");
  const globalTimerBtn = document.getElementById("global-timer");
  const alarmSound = document.getElementById("alarm-sound");

  let mediaRecorder;
  let chunks = [];
  let currentTaskId = null;

  async function initMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        addAudioToTask(currentTaskId, base64);
        loadTasks();
      };
      reader.readAsDataURL(blob);
    };
  }

  function addAudioToTask(id, audio) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.audios = task.audios || [];
      task.audios.push(audio);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function deleteAudioFromTask(taskId, audioIndex) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.audios) {
      task.audios.splice(audioIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    }
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.className = task.checked ? "checked" : "";

    // النص
    const textDiv = document.createElement("div");
    textDiv.textContent = task.text;
    li.appendChild(textDiv);

    // زر حذف المهمة
    const span = document.createElement("span");
    span.innerHTML = "&times;";
    li.appendChild(span);

    // حاوية الملاحظات وزر التسجيل
    const notesDiv = document.createElement("div");
    notesDiv.className = "notes-row";

    // إنشاء كل ملاحظة صوتية برقم وزر تشغيل وحذف
    if (task.audios && task.audios.length > 0) {
      task.audios.forEach((audio, index) => {
        const noteWrapper = document.createElement("div");

        const playBtn = document.createElement("button");
        playBtn.className = "play-btn";
        playBtn.textContent = index + 1;
        playBtn.title = `Turn on the note${index + 1}`;
        playBtn.addEventListener("click", () => {
          const audioEl = new Audio(audio);
          audioEl.play();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-audio";
        deleteBtn.title = "Delete note";
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteAudioFromTask(task.id, index);
        });

        noteWrapper.appendChild(playBtn);
        noteWrapper.appendChild(deleteBtn);
        notesDiv.appendChild(noteWrapper);
      });
    }

    // زر التسجيل
    const recordBtn = document.createElement("button");
    recordBtn.classList.add("record-btn");
    recordBtn.innerHTML = `<img src="./image/reckord.jpeg" alt="Mic" width="26px">`;
    notesDiv.appendChild(recordBtn);

    li.appendChild(notesDiv);
    taskList.appendChild(li);
  }

  function addTask() {
    const taskValue = input.value.trim();
    if (!taskValue) {
      alert("Enter the task");
      return;
    }

    const task = {
      id: Date.now().toString(),
      text: taskValue,
      checked: false,
      audios: [],
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(task);
    input.value = "";
  }

  btn.addEventListener("click", addTask);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  taskList.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const taskId = li.dataset.id;

    if (e.target.tagName === "LI") {
      li.classList.toggle("checked");
      checkSound.currentTime = 0;
      checkSound.play();
      updateTaskChecked(taskId, li.classList.contains("checked"));
    } else if (e.target.tagName === "SPAN") {
      li.remove();
      deleteTask(taskId);
    } else if (
      e.target.classList.contains("record-btn") ||
      e.target.parentElement.classList.contains("record-btn")
    ) {
      if (!mediaRecorder) await initMedia();
      currentTaskId = taskId;
      const btn =
        e.target.classList.contains("record-btn") ? e.target : e.target.parentElement;
      if (mediaRecorder.state === "inactive") {
        chunks = [];
        mediaRecorder.start();
        btn.innerHTML = `<img src="./image/on-reckord.jpeg" alt="stop" width="24px">`;
      } else {
        mediaRecorder.stop();
        btn.innerHTML = `<img src="./image/reckord.jpeg" alt="Mic" width="24px">`;
      }
    }
  });

  function updateTaskChecked(id, checked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.checked = checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
  }

  loadTasks();

  globalTimerBtn.addEventListener("click", () => {
    const minutes = prompt("How many minutes do you want before the alarm goes off ?");
    const ms = parseInt(minutes) * 60 * 1000;
    if (!isNaN(ms) && ms > 0) {
      const alarmTime = Date.now() + ms;
      localStorage.setItem("globalAlarm", alarmTime);

      setTimeout(() => {
        alarmSound.play();
        setTimeout(() => {
          alert("⏰ Time limit is up!");
          localStorage.removeItem("globalAlarm");
        }, 1000);
      }, ms);
    }
  });

  const savedAlarm = localStorage.getItem("globalAlarm");
  if (savedAlarm) {
    const remaining = savedAlarm - Date.now();
    if (remaining > 0) {
      setTimeout(() => {
        alarmSound.play();
        setTimeout(() => {
          alert("⏰ Time limit is up!");
          localStorage.removeItem("globalAlarm");
        }, 1000);
      }, remaining);
    } else {
      localStorage.removeItem("globalAlarm");
    }
  }
});

///=============================================================333=====================================================================