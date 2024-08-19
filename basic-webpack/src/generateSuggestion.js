import axios from 'axios'

const jobList = document.getElementById("jobList")
const openJobDesc = (job) => {
    const {name, isFullRemote, cityCategory, activeFrom, language, annualSalaryFrom, annualSalaryTo, technologies} = job 
    const template = `
        <div class="job-details">
            <h2>${name}</h2>
            <p><strong>Remote:</strong> ${isFullRemote ? 'Yes' : 'No'}</p>
            <p><strong>Location:</strong> ${cityCategory}</p>
            <p><strong>Posted on:</strong> ${activeFrom}</p>
            <p><strong>Language:</strong> ${language}</p>
            <p><strong>Salary Range:</strong> $${annualSalaryFrom} - $${annualSalaryTo}</p>
            <p><strong>Technologies:</strong> ${technologies.join(', ')}</p>
            <button id="suggestionBtn" class="btn">Back to list</button>

        </div>
    `;

    jobList.innerHTML = template
    document.getElementById("suggestionBtn").addEventListener("click", () => {
        generateSuggestion()
        jobList.innerHTML = ""
    })
}
export default function generateSuggestion(){
    const config = {
        hesders: {
            Accept: 'application/json'
        }
    }
    // const jobs = document.getElementById("suggestion")
    console.log(jobList,"jobList");
    axios.get('https://devitjobs.com/api/jobsLight', config)
    .then((res) => {
        console.log(res.data[0]);
        res.data.forEach((job) => {
            const li = document.createElement('li')
            // li.className = "jobOption"
            li.addEventListener("click", () => openJobDesc(job))
            li.textContent = job.name.replaceAll("-"," ")+ " - " + job.cityCategory.replaceAll("-"," ") || "error while loading the job"
            jobList.appendChild(li)
        })
        // jobs.innerHTML = res.data.map(e => e.name)
        // jobs.addEventListener(("click", () => {}))
    })

    // const jobOptions = document.querySelectorAll(".jobOption")
    // jobOptions.forEach((j) => {
    // })
}



//voglio che in base a dei parametri date le condizioni dell'utente fa fare qualcosa di rilassante
//raccolgo i paramentri, faccio la chiamata al server