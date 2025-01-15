const registerTab = document.getElementById("tab1");
const topicsTab = document.getElementById("tab2");
const summary = document.getElementById("tab3");
const submitBtn = document.getElementById("sub");

function checkFields(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const name = nameInput.value;
  const email = emailInput.value;

  const isValid = validateInputs(name, email);
  if (isValid) {
    switchToTopicsTab();

    return { step: 1, name, email };
  } else {
    alert("Please enter a valid name and email");
    return { step: 0, name: null, email: null };
  }
}

function validateInputs(name, email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return name.length >= 2 && regex.test(email);
}

function switchToTopicsTab() {
  registerTab.style.display = "none";
  topicsTab.style.display = "block";
  addTopicEvents();
}

function addTopicEvents() {
  topicsTab.addEventListener("click", (e) => {
    if (e.target.tagName === 'LABEL') {
      e.preventDefault();
      e.target.classList.toggle('active');
    }
  });
}

function checkLabelSelection() {
  const selectedLabels = topicsTab.querySelectorAll('label.active');
  console.log(selectedLabels)
  return selectedLabels.length > 0;
}

function getLabelSelections() {
  const selectedLabels = topicsTab.querySelectorAll('label.active')
  return Array.from(selectedLabels).map(label => label.textContent)
}

function setStep(step) {
  const stepIndicators = document.querySelectorAll('.step');
  const stepText = document.querySelector('.step-text')
  stepIndicators.forEach((stepIndicator, index) => {
    if (index === step) {
      stepIndicator.classList.add('current');

    } else if (index < step) {
      stepIndicator.classList.remove('current');
      stepIndicator.style.backgroundColor = '#845EEE';
    }

    stepText.textContent = `Step ${step + 1} of 3`
  });
}

function switchToSummary(e) {
  const selectedTopics = Array.from(getLabelSelections())
  const userInfo = checkFields(e)
  const topicsList = document.querySelector('.topics-list')
  topicsTab.style.display = 'none'
  summary.style.display = 'block'
  summary.innerHTML = `
            <div class="shadow"></div>
            <p class="heading">Summary</p>
            <p><span class="gray">Name: </span> ${userInfo.name}</p>
            <p><span class="gray">Email: </span> ${userInfo.email}</p><br>
            <p class="gray">Topics:</p>
            <ul class="topics-list">${
              selectedTopics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
            <button type="submit" id="sub">Submit</button>`

  console.log(selectedTopics, userInfo)
}

function renderConfirmation(){
  alert('✅ Success')
}

topicsTab.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkLabelSelection()) {
      const nextStep = 2; 
      setStep(nextStep);
      switchToSummary(e)
  } else {
      alert('Please select at least one topic');
  }
});

registerTab.addEventListener('submit', (e) => {
  const nextStep = checkFields(e);
  setStep(nextStep.step);
  console.log(nextStep.step)
});

summary.addEventListener('submit', (e) =>{
  e.preventDefault()
  renderConfirmation()
})