const jobs = [...document.querySelectorAll('[data-job]')];
const main = document.querySelector('main');

const filters = document.querySelector('.filters');
const currentTags = new Set();

function showFilters(event){ 
    const tag = event.target.closest('.requirement');
    if(!tag) return;
    filters.classList.add('visible');
    const tagContent = tag.textContent.trim().toLowerCase();
    addTags(tagContent);
    clearList();
    filterJobs(tagContent);
}

function filterJobs(filter){     
    const matches = jobs.filter(job => { 
        const tags = job.getAttribute('data-tags').split(',');
        return checkTags(tags) && tags.includes(filter);
    })
    console.log(matches , currentTags)
    matches.forEach(match => match.style.display = 'initial');
}

function checkTags(tags){ 
    let tagsMatch = 0;
    for(let value of currentTags){ 
        if(tags.includes(value)){ 
            tagsMatch++
        }
    }
    return tagsMatch === currentTags.size;
}

function addTags(tagName){ 
    if(currentTags.has(tagName)) return;
    const html = `  <div class="result">
                        <span class="filter">${tagName}</span>
                        <button class="close">
                            <img src="images/icon-remove.svg" alt="remove ">
                        </button> 
                    </div>`;
    
    filters.innerHTML += html;           
    currentTags.add(tagName);     
    console.log(currentTags);
}

function closeTag(event){ 
    const close = event.target.closest('.close');
    if(!close) return;

    const tag = close.parentElement.querySelector('.filter');
    removeTag(tag);
    close.parentElement.remove();

    const results = [...document.querySelectorAll('.result')];
    if(results.length === 0)  {
       removeTagsContainer();
    };
}

function removeTag(tag){ 
    currentTags.delete(tag.textContent.trim().toLowerCase());
    clearList();
    currentTags.forEach(tag => filterJobs(tag));
}

function removeTagsContainer(){ 
    filters.classList.remove('visible')
    jobs.forEach(job => job.style.display = 'initial');
}

function clearList(){ 
    jobs.forEach(job => job.style.display = 'none');
}

main.addEventListener('click' , showFilters);
filters.addEventListener('click' , closeTag);