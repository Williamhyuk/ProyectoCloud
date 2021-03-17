const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = '';

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 * @param {string} price
 * @param {string} cant
 */
const saveTask = (title, description, price, cant) =>
  db.collection("libros").doc().set({
    title,
    description,
    price,
    cant,
  });

const getTasks = () => db.collection("libros").get();

const onGetTasks = (callback) => db.collection("libros").onSnapshot(callback);

const deleteTask = (id) => db.collection("libros").doc(id).delete();

const getTask = (id) => db.collection("libros").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('libros').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.title}</h3>
    <p>${task.description}</p>
    <p> Precio: ${task.price}</p>
    <p> Stock: ${task.cant}</p>

    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Eliminar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Editar
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["task-price"].value = task.price;
          taskForm["task-cant"].value = task.cant;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  const price = taskForm["task-price"];
  const cant = taskForm["task-cant"];
  if (title == null && description == null && price == null && cant == null){
    console.log(error);
  }
  else{
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value, price.value, cant.value);
      } else {
        await updateTask(id, {
          title: title.value,
          description: description.value,
          price: price.value,
          cant: cant.value
        })

        editStatus = false;
        id = '';
        taskForm['btn-task-form'].innerText = 'Publicar';
      }

      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  }
});
