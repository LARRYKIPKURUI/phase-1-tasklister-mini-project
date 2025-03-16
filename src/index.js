
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById('create-task-form').addEventListener('submit', function (event) {
    event.preventDefault(); //prevent reload
    
    const taskInput = document.getElementById('new-task-description');
    const taskText = taskInput.value.trim(); //Trim input just incase of whitespaces

    if (taskText === '') return; //Avoiding blank to do's...even though  I added the required feature

    // Create list item (to add content to the list)
    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('p-2', 'mt-2');

    // Create Remove Button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('p-2', 'btn', 'btn-danger','mx-5');

    // Append the removing  button to list item
    li.appendChild(removeButton);
    document.getElementById('tasks').appendChild(li);

    // Attach event to remove only the clicked item by listening to event click !
    removeButton.addEventListener('click', () => li.remove());

    // Clear input field for input
    taskInput.value = '';
  });
});
