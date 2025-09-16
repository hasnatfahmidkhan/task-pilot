const inputTaskTitle = document.getElementById("inputTaskTitle");
const inputTaskDetail = document.getElementById("inputTaskDetail");
const addTaskBtn = document.getElementById("addTaskBtn");
const addTaskModal = document.getElementById("addTaskModal");
const taskNotAdd = document.getElementById("taskNotAdd");
const plannig = document.getElementById("plannig");
const detailsModal = document.getElementById("detailsModal");
// <!-- ===== Start: Task Section ===== -->
//
//             <!-- ===== End: Task Section ===== -->
addTaskBtn.addEventListener("click", (e) => {
  if (inputTaskTitle.value.length <= 0) {
    e.preventDefault();
    taskNotAdd.classList.remove("hidden");
    return;
  }

  taskNotAdd.classList.add("hidden");
  const taskTitle = inputTaskTitle.value;
  const taskDetail = inputTaskDetail.value;
  plannig.innerHTML += `
            <div draggable="true"
                 class="px-4 py-5 rounded-xl border border-[#ffffff1e] mt-4 cursor-grab space-y-3">
                     <div class="flex justify-between items-center gap-4 text-[17px]">
                        <h3 class="truncate">
                        ${taskTitle}
                        </h3>
                 <span>🔥</span>
               </div>
               <div class="flex items-center justify-between">
                 <div class="badge badge-accent cursor-default">Plannig</div>
                 <i 
                   class="detailBtn fa-solid fa-circle-info text-[#00d3bd] cursor-pointer text-[17px]"
                 ></i>
               </div>
             </div>
  `;
  showDetail(taskTitle, taskDetail);
  inputTaskTitle.value = "";
  inputTaskDetail.value = "";
});

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
