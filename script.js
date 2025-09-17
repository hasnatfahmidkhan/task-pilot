const inputTaskTitle = document.getElementById("inputTaskTitle");
const inputTaskDetail = document.getElementById("inputTaskDetail");
const addTaskBtn = document.getElementById("addTaskBtn");
const addTaskModal = document.getElementById("addTaskModal");
const taskNotAdd = document.getElementById("taskNotAdd");
const plannig = document.getElementById("plannig");
const detailsModal = document.getElementById("detailsModal");
const taskContainers = document.querySelectorAll(".taskContainer");

addTaskBtn.addEventListener("click", (e) => {
  if (inputTaskTitle.value.length <= 0) {
    e.preventDefault();
    taskNotAdd.classList.remove("hidden");
    return;
  }
  taskNotAdd.classList.add("hidden");
  const taskTitle = inputTaskTitle.value;
  const taskDetail = inputTaskDetail.value;

  // create task element
  const taskElem = document.createElement("div");
  taskElem.setAttribute("draggable", true);
  taskElem.className =
    "draggable px-4 py-5 rounded-xl border border-[#ffffff1e] mt-4 cursor-grab space-y-3";
  taskElem.innerHTML = `
                  <div class="flex justify-between items-center gap-4 text-[17px]">
                        <h3 class="truncate">
                        ${taskTitle}
                        </h3>
                        <span id="icon">🔥</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="badge badge-accent cursor-default">Plannig</div>
                      <i 
                        class="detailBtn fa-solid fa-circle-info text-[#00d3bd] cursor-pointer text-[17px]"
                      ></i>
                  </div>`;

  plannig.appendChild(taskElem);
  taskContainers.forEach((taskContainer) => {
    getDraggable(taskContainer.childNodes);
  });
  showDetail(taskTitle, taskDetail);
  inputTaskTitle.value = "";
  inputTaskDetail.value = "";
});

// Function for add drag events on draggable Element
function getDraggable(draggables) {
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("opacity-50", "dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("opacity-50", "dragging");
    });
  });
}

taskContainers.forEach((taskContainer) => {
  taskContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const afterDragElem = getDragAfterElement(taskContainer, e.clientY);
    // const id = taskContainer.id;
    // const icon = document.getElementById("icon");
    // if (id === "planning") {
    //   icon.textContent = "🔥";
    // }
    // if (id === "progress") {
    //   icon.textContent = "🚀";
    // }
    // if (id === "completed") {
    //   icon.textContent = "✅";
    // }
    if (afterDragElem === null) {
      taskContainer.appendChild(draggable);
    } else {
      taskContainer.insertBefore(draggable, afterDragElem);
    }
  });
});

// Function for get drag after element
const getDragAfterElement = (taskContainer, clientY) => {
  const draggableElements = [
    ...taskContainer.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};

// Function for showing task deatails
const showDetail = (taskTitle, taskDetail) => {
  const detailBtns = document.querySelectorAll(".detailBtn");
  plannig.addEventListener("click", (e) => {
    detailBtns.forEach((detailBtn) => {
      if (e.target === detailBtn) {
        detailsModal.innerHTML = `
            <div class="modal-box bg-[#0F1720] text-white">
                <h3 class="text-lg font-bold">${taskTitle}</h3>
                <p class="py-4">${taskDetail}</p>
                <form method="dialog">
                    <button class="btn btn-error">Close</button>
                </form>
          </div>
        `;
        detailsModal.showModal();
      }
    });
  });
};
